import React, { useState } from 'react';
import LoginForm from './loginForm';
import NavBar from './navbar';

export default function Login(props) {
    const adminUser = {
        email: 'admin@admin.com',
        password: 'admin'
    }

    const [user, serUser] = useState({ email: '', password: '' });

    const Login = details => {
        if(details.email == adminUser.email && details.password == adminUser.password) {
            console.log('Match');
        } else {
            console.log('Login details do not match');
        }
    }

    const Logout = () => {
        console.log('Logout');
    }
       return(
        <div>
         <NavBar Login={Login} Profile={Profile} />
         <LoginForm Login={Login}  />
        </div>
       );
}

