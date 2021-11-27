import React, { useState } from 'react';

export default function Messages(props) {
        const { name, avatarImg, groups } = props.user;

       return(
         <div className='messages'>
            <div className='messages__one'>
              <img src={avatarImg} className='user-avatar' />
              <div className='user-name'>{name}</div>
              <div className='message-content'>Message 1</div>
              <div className='message-time'>{Date()}</div>
            </div>
            <div className='messages__two'> Message 2</div>
            <div className='messages__three'> Message 3</div>
            <div className='messages__four'> Message 4</div>
            <div className='messages__five'> Message 5</div>
            <div className='messages__six'> Message 6</div>
            <div className='messages__seven'> Message 7</div>
            <div className='messages__eight'> Message 8</div>
            <div className='messages__nine'> Message 9</div>
            <div className='messages__ten'> Message 10</div>
         </div>
       );
}