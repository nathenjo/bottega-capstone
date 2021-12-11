import React from 'react';

export default function NavBar(props) {
  const { loginStatus, setPage, handleLogout } = props;
    return(
      <div className='app-navbar'>
        {loginStatus ? 
        <div className='navbar-media-wrapper'>
          <button className='navbar-media-wrapper__button' onClick={() => setPage('Groups')}>Groups</button>
          <button className='navbar-media-wrapper__button' onClick={() => setPage('Profile')}>Profile</button>
          <button className='navbar-media-wrapper__button' onClick={handleLogout}>Logout</button>
        </div>
        :
        null}
      </div>
      
    );
}