import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Message(props) {

    const {id, userId, text, user, activeGroup, setMessageDeleted} = props;
    const [userName, setUserName] = useState('');
    const [userProfilePic, setUserProfilePic] = useState('');

    const handleDeleteMessage = () => {
        if (user.id == activeGroup.adminUser) {
            axios.delete(`https://nwj-chat-app-api.herokuapp.com/messages/${id}`).then(response => {
                alert('Message deleted successfuly')
                setMessageDeleted(true);
            }).catch(error => {
                alert('Error deleting message, try again')
            })
        }
    }

    const handleUserInfo = () => {
        axios.get(`https://nwj-chat-app-api.herokuapp.com/users/${userId}`).then(response => {
            setUserName(response.data.user.name);
            setUserProfilePic(response.data.user.image_url);
          })
    }

    useEffect(() => {
        handleUserInfo()
    }, [])

       return(
         <div onClick={handleDeleteMessage} className='messages__list__message'>
            <img className='messages__list__message__image' src={userProfilePic} />
            <div className='messages__list__message__name'>{userName}</div>
            <div className='messages__list__message__text'>{text}</div>
         </div>
       );
}