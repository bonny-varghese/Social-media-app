import React, { useContext,useState } from 'react';
import './HomePageNav.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { UserContext } from './Context/User';
import SignIn from './SignIn';
import { auth } from './Firebase';

function HomePageNav() {
    const [user, setUser] = useContext(UserContext).user;

    const logoutHandle =async (e) =>{
        e.preventDefault();
        auth.signOut(). then(()=> {
            setUser(null)
          }).catch((error) =>{
            console.log(error)
          });
    }
    if (user){
    return (
        <div className='homePage__navbar'>
            <p>Cookie Media</p>
            <div className='navbar__left'>
                <img className="navbar__img" src={user.photoURL} />
                <button className='logOutBtn' onClick={logoutHandle}>Logout</button>
            </div>
        </div>
    )
    }else{
        return(
            null
        )
    }
}

export default HomePageNav
