import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AddMessage(props) {

    const { messagesList, setMessagesList, user, activeGroup, setMessageAdded } = props;

    const [messageValue, setMessageValue] = useState('');

    // useEffect(() => {

    // }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("https://nwj-chat-app-api.herokuapp.com/add_message", {text: messageValue, user_id: user.id, group_id: activeGroup.code}).then(response => {
            setMessagesList(messagesList.concat(messageValue));
            setMessageValue('');
            setMessageAdded(true);
        }).catch(error => {
            alert('Error with submitting message, try again')
        });
    }

       return(
        <div className='add-message'>
         <form onSubmit={handleSubmit} className='add-message__form'>
            <textarea
                className='add-message__form__input'
                type='text'
                value={messageValue}
                maxLength='120'
                onChange={(e) => setMessageValue(e.target.value)}
            />
            <input className='add-message__form__button' type='submit' />
         </form>
        </div>
       );
}