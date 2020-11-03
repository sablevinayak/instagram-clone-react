import React, { useState, useEffect } from 'react'; 
import './App.css';
import Post from './Post';
import { db } from './firebase';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([
    // {
    //   userName: "Username_placeholder",
    //   caption: "Wow it workds",
    //   imageUrl: "https://www.freemockupworld.com/wp-content/uploads/2019/08/Identity-Card-Holder-Mockup-PSD-1500x1400.jpg"
    // }
  ]);


  const [open, setOpen] = useState(false);

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
    setPosts(snapshot.docs.map(doc => ({
      id: doc.id,
      post: doc.data()
    })));
    })
  }, [])

  // function handleClose(params) {
  //   setOpen(false)
  // }

  return (
    <div className="app">

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Signup here</h2>
        </div>
      </Modal>

      <div className="app__header"> 
        <img 
          className = "app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        />
        <Button onClick={()=>setOpen(true)}>Sign Up</Button>
      </div>
      
      

      {
        posts.map(({id, post}) => (
          <Post key={id} caption={post.caption} userName = {post.userName} imageUrl={post.imageUrl}/>
        ))
      }

      {/* <Post userName="Username" caption="Wow that worked" imageUrl = "https://www.freemockupworld.com/wp-content/uploads/2019/08/Identity-Card-Holder-Mockup-PSD-1500x1400.jpg"/>
      <Post userName="Username" caption="Nope" imageUrl = "https://www.freemockupworld.com/wp-content/uploads/2019/08/Identity-Card-Holder-Mockup-PSD-1500x1400.jpg"/>
      <Post userName="Username" caption="Dope" imageUrl = "https://www.freemockupworld.com/wp-content/uploads/2019/08/Identity-Card-Holder-Mockup-PSD-1500x1400.jpg"/> */}
      {/* <Post/> */}

    </div>
  );
}

export default App;
