import React, { useState } from 'react';
import axios from 'axios';

export default function DeleteButton(props) {

    const { setGroupDeleted, text, group } = props;

       return(
        <button className='group-list__group-button' onClick={() => axios.delete(`https://nwj-chat-app-api.herokuapp.com/groups/${group.id}`).then(response => {
            setGroupDeleted(true)
          }).catch(error => {
            console.log(error);
          })}>{text}</button>
       );
}