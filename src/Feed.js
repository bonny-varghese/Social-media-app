import React, { useState, useEffect } from 'react';
import  Post  from './Post';
import './Feed.css';
import { db } from './Firebase';
import Navbar from './Navbar';
import CreatePost from './CreatePost';

export default function Feed() {
    

    const [posts, setPosts] = useState([]);

    useEffect(() => {
       
        db.collection("posts").orderBy("timestamp", "desc").onSnapshot((snapshot)=>{
            setPosts(snapshot.docs.map((doc)=>({
                id: doc.id,
                post: doc.data()
            })));
        })
    }, [])

    return (
        <div>
        <Navbar/>
        <CreatePost/>
        <div className="feed">
                        
            {posts.map(({ id, post})=>{
                return (
                    <Post 
                    key={id}
                    id={id}
                    profileUrl={post.profileUrl}
                    username={post.username}
                    photoURL={post.photoUrl}
                    caption={post.caption}
                    comments={post.comments}
                    like={post.like}
                    love={post.love}
                    likedBy={post.likedBy}
                    lovedBy={post.lovedBy}
                   
                    />
                );
            })}
        </div>
        </div>
    )
}
