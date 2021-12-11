import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Groups from './groups/groups';
import Profile from './profile';
import Home from './home';
import NavBar from './navbar';
import SmallNavbar from './smallNavbar';
import NewUser from './newUser';
import LoginForm from './loginForm';
import NewUserButton from './newUserButton';
import Messages from './messages/messages';
import LoadingIcon from './loadingIcon';

export default function App() {

  const [page, setPage ] = useState('Home');
  const [user, setUser] = useState({id: '', name: '', email: '', password: '', image_url: ''});
  const [loginStatus, setLoginStatus] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [ emailValue, setEmailValue ] = useState('');
  const [ passwordValue, setPasswordValue ] = useState('');
  const [activeGroup, setActiveGroup] = useState({});
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [loading, setLoading] = useState(true);
  const [loginSubmission, setLoginSubmission] = useState(false);


  useEffect(() => {
    window.addEventListener('resize', handleScreenSize)
    if (loginStatus == true) {
      setLoginError(false)
    }
  }, [loginStatus])

  const handleScreenSize = () => {
    setScreenSize(window.innerWidth)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoginSubmission(true);
    axios.get("https://nwj-chat-app-api.herokuapp.com/users").then(response => {
      response.data.users.map(user => {
        if (user.email == emailValue && user.password == passwordValue) {
          setUser({id: user.id, name: user.name, email: emailValue, password: passwordValue, image_url: user.image_url});
          setLoginStatus(true);
          setPage('Groups');
          setLoginError(false);
          setLoading(false);
        }
      })
    }).catch(error => {
      setLoginError(true);
    })
    setEmailValue('');
    setPasswordValue('');
  }

  const handleLogout = () => {
    setUser({});
    setLoginStatus(false);
    setLoading(true);
    setLoginSubmission(false);
    setPage('Home')
  }

  return (
    <div className='app'>
          {screenSize > 600 ? <NavBar loginStatus={loginStatus} setPage={setPage} handleLogout={handleLogout}/>
          :
          <SmallNavbar loginStatus={loginStatus} setPage={setPage} handleLogout={handleLogout} /> }
          {page == 'Home' ? <LoginForm
            handleSubmit={handleSubmit}
            emailValue={emailValue}
            setEmailValue={setEmailValue}
            passwordValue={passwordValue}
            setPasswordValue={setPasswordValue}
            loginStatus={loginStatus}
          /> : null}
          {loading && loginSubmission ? <LoadingIcon /> : null }
          {page == 'Home' ? <NewUserButton loginStatus={loginStatus} setPage={setPage} /> : ''}
          {loginError ? <div className='app__error'>Error with login credentials, please try again</div> : null}
          {page == 'Groups' ? <Groups setActiveGroup={setActiveGroup} user={user} setPage={setPage} /> : Home}
          {page == 'NewUser' ?
            <NewUser
              setPage={setPage}
              setUser={setUser}
              emailValue={emailValue}
              setEmailValue={setEmailValue}
              passwordValue={passwordValue}
              setPasswordValue={setPasswordValue}
              loginStatus={loginStatus}
              setLoginStatus={setLoginStatus}
            /> : Home}
          {page == 'Profile' ? <Profile user={user} loginStatus={loginStatus} /> : Home}
          {page == 'Messages' ? <Messages activeGroup={activeGroup} user={user} loginStatus={loginStatus} /> : Home}
    </div>
  );
}