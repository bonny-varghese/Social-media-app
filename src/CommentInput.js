import React, { useState, useContext } from 'react';
import './CommentInput.css';
import { UserContext } from './Context/User';
import { db } from './Firebase';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

export default function CommentInput({comments, id}) {
    const [comment, setComment] = useState("");
    const [user, setUser] = useContext(UserContext).user;
    const [commentArray, setCommentArray] = useState(comments ? comments:[]);

    const addComment = ()=>{
        //add comment to post info
        if (comment!=""){
            commentArray.unshift({
                comment : comment,
                username : user.displayName
            });

            db.collection("posts")
            .doc(id)
            .update({
                comments : commentArray,
            }).then(()=>{
                setComment("");
            })
            document.getElementById("area").style.height='25px';
        }
    }

    const autoGrow = (element,defaultHeight)=>{
        if(element){
        const target = element.target ? element.target :element;
        target.style.height = defaultHeight;
        target.style.height = `${target.scrollHeight}px`;
        }
        setComment(element.target.value);
        
    }

    return (
        <div className = "commentInput">
            <textarea className = "commentInput__textarea" id="area"
            rows="0"
            placeholder="Write a comment..."
            onChange={(event) => autoGrow(event,'30px')}
            value={comment}>

            </textarea>
            <IconButton>
            <SendIcon onClick={addComment} className = "commentInput__btn" />
            </IconButton>
        </div>
    )
}
