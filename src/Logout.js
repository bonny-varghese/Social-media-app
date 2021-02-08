import React, { useContext } from 'react';
import './Logout.css'
import { auth } from './Firebase';
import { UserContext } from './Context/User';


function Logout() {
    const [user, setUser] = useContext(UserContext).user;
    let isSignedIn;
    const logoutHandle =async (e) =>{
        e.preventDefault();
        
        console.log(isSignedIn)
        auth.signOut(). then(()=> {
            setUser(null)   
          }).catch((error) =>{
            console.log(error)
          });
    }

    return (
        <button type="submit" className="logOutBtn" onClick={logoutHandle} >
            Logout
        </button>
    )
}

export default Logout
