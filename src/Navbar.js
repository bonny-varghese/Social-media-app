import React, { useContext, useState } from 'react';
import './Navbar.css';
import { UserContext, UserContextProvider } from './Context/User';

function Navbar() {
    
    const [user, setUser] = useContext(UserContext).user;
        
    
    return (       
            <div >
           </div>       
    )
    
}

export default Navbar
