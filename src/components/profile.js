import React, { useEffect, useState } from 'react';

export default function Profile(props) {
    const { name, groups } = props.user;

    const [profilePicture, setProfilePicture] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzK9ecwS0S77dPNOcGewc0KlAWXhO_BkRNsw&usqp=CAU');
    const [clickAmount, setClickAmount] = useState(1);

    useEffect(() => {
        changeProfile()
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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Image submitted to server');
    }
       return(
         <div className='profile'>
            <img className='profile__image' onClick={handleClick} src={profilePicture} />
            <i onClick={handleClick} className='fas fa-pen profile__edit-icon'></i>
            <button className='profile__button' type='submit' onClick={handleSubmit}>Save</button>
            <div className='profile__user-name'>Name: {name}</div>
            <div className='profile__joined-groups'> Groups: {groups.groupOne.name}</div>
         </div>
       );
}