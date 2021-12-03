import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AddMessage(props) {

    const { messagesList, setMessagesList, user } = props;

    const [messageValue, setMessageValue] = useState('');

    useEffect(() => {

    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:5000/add_message", {text: messageValue, user_id: user.id})
        setMessagesList(messagesList.concat(messageValue));
        setMessageValue('');
    }

       return(
        <div className='add-message'>
         <form onSubmit={handleSubmit} className='add-message__form'>
            <textarea
                className='add-message__form__input'
                type='text'
                value={messageValue}
                maxLength='250'
                onChange={(e) => setMessageValue(e.target.value)}
            />
            <input className='add-message__form__button' type='submit' />
         </form>
        </div>
       );
}