import React, { useEffect, useState } from 'react';

export default function AddMessage(props) {

    const { messagesList, setMessagesList } = props;

    const [messageValue, setMessageValue] = useState('');

    useEffect(() => {

    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
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
                onChange={(e) => setMessageValue(e.target.value)}
            />
            <input className='add-message__form__button' type='submit' />
         </form>
        </div>
       );
}