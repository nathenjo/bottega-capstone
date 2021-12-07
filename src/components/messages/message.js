import axios from 'axios';
import React, { useState } from 'react';

export default function Message(props) {

    const {id, image, name, text, user, activeGroup, setMessageDeleted} = props;

    const handleDeleteMessage = () => {
        if (user.id == activeGroup.adminUser) {
            axios.delete(`http://localhost:5000/messages/${id}`).then(response => {
                alert('Message deleted successfuly')
                setMessageDeleted(true);
            }).catch(error => {
                alert('Error deleting message, try again')
            })
        }
    }

       return(
         <div onClick={handleDeleteMessage} className='messages__list__message'>
            <img className='messages__list__message__image' src={image} />
            <div className='messages__list__message__name'>{name}</div>
            <div className='messages__list__message__text'>{text}</div>
         </div>
       );
}