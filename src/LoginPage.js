import React, { useContext } from 'react';
import './LoginPage.css';
import { signInWithGoogle } from './Auth';
import { UserContext } from './Context/User';
import image from './Images/social-media.png';
import {auth, db, provider} from './Firebase';

function LoginPage() {
    const [user, setUser] = useContext(UserContext).user;

    let signInBtnClick = async ()=>{           
            await auth.signInWithPopup(provider)
            .then((res)=>{
                setUser(res.user);
                console.log('user from login page',user);
                db.collection('users')
                .doc(user.uid)
                .set({
                    username: user.displayName,
                    uid: user.uid,
                    createdAt: new Date(),
                    isOnline: true
                }) 
                localStorage.setItem("is_logged_in", "true");
                console.log(localStorage)
               
    
            })
            .catch((error)=>{
                console.log(error.message)
            });
            return user;
      
        
    }
    return (
        
        <div className='login__content'>
            <div className="login__left">
            <p className="login__leftText">Stay Connected with CookieMedia</p>
                <img src={image} width="600" height="400"/>            
            </div>
            <div className="login__right">
            <button 
            type='button' 
            onClick={signInBtnClick}
            className="login__rightText">
            Sign In With Google
            </button>
            </div>
        </div>
     
  );
}

export default LoginPage
