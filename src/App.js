import React, { useState, useEffect } from 'react'; 
import './App.css';
import Post from './Post';

function App() {

  const [posts, setPosts] = useState([
    {
      userName: "Username_placeholder",
      caption: "Wow it workds",
      imageUrl: "https://www.freemockupworld.com/wp-content/uploads/2019/08/Identity-Card-Holder-Mockup-PSD-1500x1400.jpg"
    },
    {
      userName: "Username_placeholder",
      caption: "Wow it workds",
      imageUrl: "https://www.freemockupworld.com/wp-content/uploads/2019/08/Identity-Card-Holder-Mockup-PSD-1500x1400.jpg"
    }
  ]);

  return (
    <div className="app">
      <div className="app__header"> 
        <img 
          className = "app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        />
      </div>
      {/* Header */}
      {
        posts.map(post => (
          <Post userName = {post.userName} caption={post.caption} imageUrl={post.imageUrl}/>
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
