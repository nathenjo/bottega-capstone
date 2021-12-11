import React from 'react';

export default function NewUserButton(props) {
    const { setPage, loginStatus } = props;
       return(
         <div className='new-user-button'>
             {!loginStatus ?
                <button className='new-user-button__button' onClick={() => setPage('NewUser')} >New User?</button>
            : null }
         </div>
       );
}