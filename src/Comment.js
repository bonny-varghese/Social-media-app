import React, { useContext } from 'react';
import './Comment.css';
import { UserContext } from './Context/User';

export default function Comment({username, caption, id}) {
    
    
    const [user, setUser] = useContext(UserContext).user;
    return (
        <div className="comment">
                <div className="comment__div">
                    <strong style={{marginRight:"6px"}}>{username}</strong>                    
                </div>
                    {caption}
        </div>
    )
}
