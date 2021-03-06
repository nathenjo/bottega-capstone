import axios from 'axios';
import React, { useEffect, useState } from 'react';

import LoadingIcon from './loadingIcon';

export default function Profile(props) {
    const { user } = props;


    const [profilePicture, setProfilePicture] = useState('');
    const [currentProfilePicture, setCurrentProfilePicture] = useState(user.image_url);
    const [clickAmount, setClickAmount] = useState(1);
    const [loading, setLoading] = useState(true);
    const [changeSubmit, setChangeSubmit] = useState(false);

    useEffect(() => {
        changeProfile()
        setLoading(true);
        setChangeSubmit(false);
        handleCurrentProfileImage()
    }, [clickAmount])

    const changeProfile = (event) => {
         if(clickAmount % 3 == 0) {
            setProfilePicture('https://www.kindpng.com/picc/m/290-2903658_eagle-clipart-dead-geometric-eagle-head-hd-png.png')
        } else if (clickAmount % 2 == 1) {
            setProfilePicture('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzK9ecwS0S77dPNOcGewc0KlAWXhO_BkRNsw&usqp=CAU')
        } else if(clickAmount % 2 == 0) {
            setProfilePicture('https://dbdzm869oupei.cloudfront.net/img/sticker/preview/5773.png')
        } 
    }

    const handleClick = () => {
        setClickAmount(prevClickAmount => prevClickAmount + 1);
    }

    const handleCurrentProfileImage = () => {
        axios.get(`https://nwj-chat-app-api.herokuapp.com/users/${user.id}`).then(response => {
            setCurrentProfilePicture(response.data.user.image_url);
        }).catch(error => {
            console.log(error);
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setChangeSubmit(true);
        axios.put(`https://nwj-chat-app-api.herokuapp.com/edit_user/${user.id}`, {image_url: profilePicture}).then(response => {
            handleCurrentProfileImage();
            setLoading(false);
            setClickAmount(1);
        }).catch(error => {
            console.log(error);
        })
    }
       return(
         <div className='profile'>
            <label className='profile__current-label'>Current Profile Pic</label>
            <img className='profile__current-image' src={currentProfilePicture} />
            <label className='profile__image-label'>Change Profile Pic</label>
            <img className='profile__image' onClick={handleClick} src={profilePicture} />
            <i onClick={handleClick} className='fas fa-pen profile__edit-icon'></i>
            <button className='profile__button' type='submit' onClick={handleSubmit}>Save</button>
            <div className='profile__user-name'>Name: {user.name}</div>
            {loading && changeSubmit ? <LoadingIcon /> : null}
         </div>
       );
}