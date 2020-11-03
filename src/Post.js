import React,{ useState, useEffect } from 'react'
import './Post.css';
import Avatar from "@material-ui/core/Avatar";
import { db } from './firebase';
import firebase from 'firebase';

function Post({ postId, userName, user, caption, imageUrl }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState();

    useEffect(()=>{
        // console.log(postId)
        let unsubscribe;
        if (postId){
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()))
                });
        }
        // console.log(comments)
        return () => {
            unsubscribe();
        };

    }, [postId]);

    const postComment = (event) =>{
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            userName: user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }

    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt="Username"
                    src="/static/images/avatar/1.jpg"
                />
                <h3>{userName}</h3>
            {/* header -> avatar + username */}
            </div>
            <img 
            alt = ""
            className="post__image"
            src={imageUrl}/>

            <h4 className="post__text"><strong>{userName}</strong> {caption}</h4>
            
            <div className="post__comments">
                {comments.map((comment) => (
                        <p>
                            <strong>{comment.userName}</strong> {comment.text}
                        </p>
                ))}
            </div>

            {user && (
                <form className="post__commentbox">
                    <input
                        className="post__input"
                        type="text"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />

                    <button
                        disabled={!comment}
                        className="post__button"
                        type="submit"
                        onClick={postComment}
                    >
                        Post
                    </button>
                </form>    
            )}

            
        </div>
    )
}

export default Post
