import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from './Context/User';
import './Post.css';
import Comment from './Comment';
import { storage, db, auth } from './Firebase';
import CommentInput from './CommentInput';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Badge from '@material-ui/core/Badge';





export default function Post({profileUrl,
                              username,
                              id,
                              photoURL,
                              caption,
                              comments,
                              likedBy,
                              lovedBy
                            }) {

    const [user, setUser] = useContext(UserContext).user;
    const [color, setColor] = useState('');
    const [heartColor, setHeartColor] = useState('');
    const [like, setLike] = useState(true)
    const [love, setLove] = useState(true)
    const [likedByArray, setLikedByArray] = useState(likedBy ? likedBy: [])
    const [lovedByArray, setLovedByArray] = useState(lovedBy ? lovedBy: [])

    const deletePost= ()=>{
        var imageRef = storage.refFromURL(photoURL);
        imageRef.delete();
        db.collection("posts").doc(id).delete()
    }
    useEffect(() => {
       
        if (user) {
            if(likedByArray.includes(user.displayName)){
                setColor('blue')
            }else{
                setColor('')
            }

            if(lovedByArray.includes(user.displayName)){
                setHeartColor('red')
            }else{
                setHeartColor('')
            }

        } 
    }, [user])

	useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
          });
    }, [auth])

    const likeHandler=()=>{
                if(likedByArray.includes(user.displayName)) {
                    setLike(false)
                    setColor('')                    
                }else{
                    setLike(true)
                    setColor('blue')                        
                }       
            if(color==''){
                likedByArray.push(user.displayName)
                
            }else{
                var index = likedByArray.indexOf(user.displayName);
                if (index >= 0) {
                    likedByArray.splice( index, 1 );
                }
            }
        db.collection("posts")
            .doc(id)
            .update({
                like : like,
                likedBy : likedByArray
            })    
    }
    const loveHandler=()=>{
            if(lovedByArray.includes(user.displayName)) {
                setLove(false)
                setHeartColor('')                
            }else{
                setLove(true)
                setHeartColor('red')                    
            }
          
        if(heartColor==''){
            lovedByArray.push(user.displayName)
            
        }else{
            var index = lovedByArray.indexOf(user.displayName);
            if (index >= 0) {
                lovedByArray.splice( index, 1 );
            }
        }
    db.collection("posts")
        .doc(id)
        .update({
            love : love,
            lovedBy : lovedByArray
        })
    }

    

    if (user){
       
    return (
        
        <div className="post"> 
            <div  className="post__header">
                <div  className="post__headerLeft"> 
                    <img  className="post__profilePic" src={profileUrl}/>
                    <p style={{marginLeft:"8px"}}><strong>{username}</strong></p>
                </div>                
                {(user.displayName===username) ? (
                    <IconButton>
                    <DeleteIcon onClick={deletePost} className="post__delete"/>
                    </IconButton>
                ) : (<></>)}                
            </div>

            <div className="post__caption">
                <p style={{fontStyle:"italic"}}>
                    {caption}
                </p>
            </div>

            <div className="post__center">
                <img className="post__photoUrl" src={photoURL} />
            </div>
            <div className="post__icons">
                <div>
                    <IconButton>
                        <Badge badgeContent={likedByArray.length} color="primary">
                            <ThumbUpIcon onClick={likeHandler} style={{color: color}}/>
                         </Badge>   
                    </IconButton>
                </div>
                <div>
                    <IconButton>
                    <Badge badgeContent={lovedByArray.length} color="secondary">
                        <FavoriteIcon onClick={loveHandler} style={{color: heartColor}}/>
                    </Badge>    
                    </IconButton>
                </div>   
            
            </div>
            
            {user ? <CommentInput comments={comments} id={id} /> : <></>}
            {comments ? comments.map((comment)=>
            <Comment username={comment.username}
            caption={comment.comment} 
            id={id}/>): <></>}            
        </div>    
    )
}else{
    return null;
}
}
