import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Groups from './groups/groups';
import Profile from './profile';
import Messages from './messages/messages';
import Home from './home';
import NavBar from './navbar';
import NewUser from './newUser';
import LoginForm from './loginForm';
import NewUserButton from './newUserButton';

export default function App() {

    const [page, setPage ] = useState('Home');
    const [user, setUser] = useState({name: '', email: '', password: '', image_url: ''});
    const [loginStatus, setLoginStatus] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [ emailValue, setEmailValue ] = useState('');
    const [ passwordValue, setPasswordValue ] = useState('');
    const [display, setDisplay] = useState({display: 'none'})

    useEffect(() => {
      setPage('Home')
    }, [user])

    const handleSubmit = (event) => {
      event.preventDefault();
      axios.get("http://localhost:5000/users").then(response => {
        response.data.users.map(user => {
          if (user.email == emailValue && user.password == passwordValue) {
            setUser({id: user.id, name: user.name, email: emailValue, password: passwordValue, image_url: user.image_url});
            setLoginStatus(true)
            setPage('Groups')
            setDisplay({display: 'initial'})
            setLoginError(false)
          }
        })
      })
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
            {page == 'Groups' ? <Groups user={user} setPage={setPage} loginStatus={loginStatus} /> : Home}
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
            {page == 'Messages' ? <Messages user={user} loginStatus={loginStatus} /> : Home}
      </div>
    );
}