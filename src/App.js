import React, { useState, useEffect } from 'react'; 
import './App.css';
import Post from './Post';
import { db, auth } from './firebase';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
// import InstagramEmbed from 'react-instagram-embed';

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
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userName, setUserName] = useState();
  const [user, setUser] = useState(null)
  const [openSignIn, setOpenSignIn] = useState(false);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser){
        //user has logged in
        console.log(authUser);
        setUser(authUser);
      } else{
        //user has logged out
        setUser(null);
      }
    })
    return ()=>{
      //perform some cleanup actions
      unsubscribe();
    }
  }, [user, userName]);

  useEffect(() => {
    db.collection('posts').orderBy('timestamp','asc').onSnapshot(snapshot => {
    setPosts(snapshot.docs.map(doc => ({
      id: doc.id,
      post: doc.data()
    })));
    })
  }, [])

  // function handleClose(params) {
  //   setOpen(false)
  // }

  const signUp = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser)=>{
      return authUser.user.updateProfile({
        displayName : userName
      })
    })
    .catch((error) => alert(error.message))
    setOpen(false)
  }

  const signIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
    .catch((error) => alert(error.message));

    setOpenSignIn(false)
  }

  return (
    <div className="app">
      
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className = "app__signup">
            <center>
              <img 
                alt = ""
                className = "app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              />
            </center>
            <Input
              placeholder="Username"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>Sign up</Button>
          </form>
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className = "app__signin">
            <center>
              <img 
                alt = ""
                className = "app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              />
            </center>
            <Input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>Sign In</Button>
          </form>
        </div>
      </Modal>


      <div className="app__header"> 
        <img 
          alt = ""
          className = "app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        />
        
        {user ? (
              <Button onClick={()=>auth.signOut()}>Log out</Button>
            ): (
              <div className = "app__loginContainer">
                <Button onClick={()=>setOpenSignIn(true)}>Sign In</Button>
                <Button onClick={()=>setOpen(true)}>Sign Up</Button>
              </div>
            )}
      </div>
      
      
      <div className="app__posts">
        <div className="app__postsLeft">
        {
          posts.map(({id, post}) => (
            <Post postId={id} caption={post.caption} userName = {post.userName} user={user} imageUrl={post.imageUrl}/>
          ))
        }
        </div>
        <div className="app__postRight">
        {/* <InstagramEmbed
          url='https://www.instagram.com/p/CHBK7-bgV-p/'
          maxWidth={320}
          hideCaption={false}
          containerTagName='div'
          protocol=''
          injectScript
          onLoading={() => {}}
          onSuccess={() => {}}
          onAfterRender={() => {}}
          onFailure={() => {}}
        /> */}
        </div>
      </div>

      {user?.displayName ? (
        <ImageUpload userName = {user.displayName}/>
        ) :(
        <h3>Sorry you need to login to upload</h3>
      )}

    </div>
  );
}

export default App;
