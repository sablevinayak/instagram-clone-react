import React from 'react'
import './Post.css';
import Avatar from "@material-ui/core/Avatar";

function Post({ userName, caption, imageUrl }) {
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
            className="post__image"
            src={imageUrl}/>

            <h4 className="post__text"><strong>{userName}</strong> {caption}</h4>
        </div>
    )
}

export default Post
