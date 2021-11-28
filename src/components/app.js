import React, { useEffect, useState } from 'react';

import Groups from './groups/groups';
import Profile from './profile';
import Messages from './messages/messages';
import Home from './home';
import NavBar from './navbar';
import NewUser from './newUser';
import LoginForm from './loginForm';
import NewUserButton from './newUserButton';

export default function App() {

    const adminUser = {
      email: 'admin@admin.com',
      password: 'admin'
    }

    const sampleUser = {
      id: Math.random(),
      name: 'Sample User',
      avatarImg: 'https://www.kindpng.com/picc/m/482-4829270_geometric-animal-wolf-drawing-hd-png-download.png',
      email: 'sample@email.com',
      samplePassword: 'password',
      groups: {
        groupOne: {
          id: Math.random(),
          name: 'Sample Group',
          adminUser: 'sample@email.com',
          users: [{sampleUser}]
        }
    }}

    const [page, setPage ] = useState('Home');
    const [user, setUser] = useState({email: '', password: ''});
    const email = user.email;
    const password = user.password;
    const [loginStatus, setLoginStatus] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [ emailValue, setEmailValue ] = useState('');
    const [ passwordValue, setPasswordValue ] = useState('');
    const [display, setDisplay] = useState({display: 'none'})

    useEffect(() => {
      setPage('Home')
      checkLoginStatus()
    }, [user])

    const checkLoginStatus = () => {
      {if (email == adminUser.email && password == adminUser.password) {
        setLoginStatus(true);
        setLoginError(false);
        setPage('Groups')
        setDisplay({display: 'initial'})
      }}
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      setUser({email: emailValue, password: passwordValue});
      {if (email !== adminUser.email || password !== adminUser.password) {
        setLoginError(true)
      }}
      setEmailValue('');
      setPasswordValue('');
    }

    const handleLogout = () => {
      setUser({});
      setLoginStatus(false);
      setDisplay({display: 'none'})
      setPage(Home)
    }

    return (
      <div className='app'>
            <NavBar display={display} handleLogout={handleLogout} setPage={setPage} />
            {page == 'Home' ? <LoginForm
              handleSubmit={handleSubmit}
              emailValue={emailValue}
              setEmailValue={setEmailValue}
              passwordValue={passwordValue}
              setPasswordValue={setPasswordValue}
              loginStatus={loginStatus}
            /> : null}
            {page == 'Home' ? <NewUserButton loginStatus={loginStatus} setPage={setPage} /> : ''}
            {loginError ? <div className='app__error'>Error with login credentials, please try again</div> : null}
            {page == 'Groups' ? <Groups loginStatus={loginStatus} /> : Home}
            {page == 'NewUser' ?
              <NewUser
                setPage={setPage}
                setUser={setUser}
                emailValue={emailValue}
                setEmailValue={setEmailValue}
                passwordValue={passwordValue}
                setPasswordValue={setPasswordValue}
                loginStatus={loginStatus}
              /> : Home}
            {page == 'Messages' ? <Messages user={sampleUser} loginStatus={loginStatus} /> : Home}
            {page == 'Profile' ? <Profile user={sampleUser} loginStatus={loginStatus} /> : Home}
      </div>
    );
}