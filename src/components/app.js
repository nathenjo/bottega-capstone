import React, { useEffect, useState } from 'react';

import Groups from './groups/groups';
import Messages from './messages/messages';
import Home from './home';
import NavBar from './navbar';

export default function App() {

    const adminUser = {
      email: 'admin@admin.com',
      password: 'admin'
    }

    const sampleUser = {
      id: Math.random(),
      name: 'Sample User',
      email: 'sample@email.com',
      samplePassword: 'password',
      groups: [
        {groupOne: {
          id: Math.random(),
          name: 'Sample Group',
          adminUser: 'sample@email.com',
          users: [{sampleUser}]
        }
        }]
    }

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
            {/* {page == 'Home' ? <div><Home loginStatus={loginStatus} /></div> : Home} */}
            {!loginStatus ? 
            <form className='app__form' onSubmit={handleSubmit}>
              <label className='app__form__email-label'>Email</label>
              <input className='app__form__email' type='email' value={emailValue} onChange={e => setEmailValue(e.target.value)} placeholer='Email' />

              <label className='app__form__password-label'>Password</label>
              <input className='app__form__password' type='password' value={passwordValue} onChange={e => setPasswordValue(e.target.value)} placeholer='Password' />
              <input className='app__form__submit' type='submit' />
            </form> : null}
            {loginError ? <div className='app__error'>Error with login credentials, please try again</div> : null}
            {page == 'Groups' ? <Groups loginStatus={loginStatus} /> : Home}
            {page == 'Messages' ? <Messages loginStatus={loginStatus} /> : Home}
      </div>
    );
}