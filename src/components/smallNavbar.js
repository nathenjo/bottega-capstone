import React, { useEffect, useState } from 'react';

export default function SmallNavbar(props) {
  const { loginStatus, setPage, handleLogout } = props;

    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {

    }, [showSidebar])

    const handleDisplayClick = () => {
        setShowSidebar(!showSidebar)
    }

    return(
      <div className='app-navbar'>
        {loginStatus ? 
        <div className='navbar-sidebar'>
        <i onClick={handleDisplayClick} class="fas fa-chevron-circle-down"></i>
            {showSidebar ? <div className='navbar-sidebar__wrapper'>
                    <button className='navbar-sidebar__wrapper__button' onClick={() => setPage('Groups')}>Groups</button>
                    <button className='navbar-sidebar__wrapper__button' onClick={() => setPage('Profile')}>Profile</button>
                    <button className='navbar-sidebar__wrapper__button' onClick={handleLogout}>Logout</button>
            </div> : null}
        </div>
        :
        null}
      </div>
      
    );
}