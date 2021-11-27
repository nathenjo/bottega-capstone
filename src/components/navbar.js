import React, { useEffect, useState } from 'react';

export default function NavBar(props) {
  const { display, setPage, handleLogout } = props;

       return(
          <div className='navbar'>
              <button style={display} onClick={() => setPage('Groups')}>Groups</button>
              <button style={display} onClick={() => setPage('Messages')}>Messages</button>
              <button style={display} onClick={handleLogout}>Logout</button>
         </div>
       );
}