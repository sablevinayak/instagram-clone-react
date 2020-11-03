import { Button, Input } from '@material-ui/core';
import React,{ useState } from 'react';
import firebase from "firebase";
import { storage, db } from './firebase';
import './ImageUpload.css';


export default function ImageUpload({ userName }) {
    
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    // const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    
    const filePickerChange = (event) => {
        if(event.target.files[0]){
            console.log("Image set")
            setImage(event.target.files[0]);
        }
    };

    const handleupload = () => {
        console.log("Uploading ")
        const uploadTask = storage.ref(`images/${image.name}`).put(image)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message)
            },
            () => {
                //complete function
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url =>{
                    // post image inside db
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        userName: userName
                    });
                    
                    setProgress(0);
                    setCaption("");
                    setImage(null);
                })
            }
        )
    }

    return (
        <div className='imageupload'>

            <progress className="imageupload__progress" value={progress} max="100"/>
            <Input type="text" 
            placeholder="Write the caption here.."
            onChange={(event) => setCaption(event.target.value)}
            value = {caption}
            />
            <Input type="file" onChange={filePickerChange} />
            <Button onClick={handleupload}> Upload </Button>
        </div>
    )
}
