import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './LoginPageNav.css';

function LoginPageNav() {
    return (
        
        <div className='login__navbar'>
        <AppBar position="static">
            <Toolbar>
            <Typography >
                Cookie Media
            </Typography>
            </Toolbar>
        </AppBar>
        </div>
        
    )
}

export default LoginPageNav
