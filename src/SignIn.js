import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from './Context/User';
import LoginPageNav from './LoginPageNav'
import LoginPage from './LoginPage'
import './SignIn.css'

function SignIn() {

    const [user, setUser] = useContext(UserContext).user;

    if (!user){
    return (
        <div className="signIn">
            <LoginPageNav />
            <LoginPage />
        </div>
    )
    }else{return null}
}

export default SignIn
