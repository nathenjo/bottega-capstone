import React, { useEffect, useState } from 'react';

export default function NavBar(props) {
  const { display, setPage, handleLogout } = props;
    return(
      <div className='navbar'>
        <div className='navbar-media-wrapper'>
          <button className='navbar-media-wrapper__button' style={display} onClick={() => setPage('Groups')}>Groups</button>
          <button className='navbar-media-wrapper__button' style={display} onClick={() => setPage('Messages')}>Messages</button>
          <button className='navbar-media-wrapper__button' style={display} onClick={() => setPage('Profile')}>Profile</button>
          <button className='navbar-media-wrapper__button' style={display} onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
}