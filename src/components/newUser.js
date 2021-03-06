import axios from 'axios';
import React, { useEffect, useState } from 'react';

import LoadingIcon from './loadingIcon';

export default function NewUser(props) {
    const {
        setPage,
        setLoginStatus,
        setUser,
        emailValue,
        setEmailValue,
        passwordValue,
        setPasswordValue
    } = props;

    const [confirmPassword, setConfirmPassword] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [showPasswordError, setShowPasswordError] = useState(false);
    const [showLoginError, setShowLoginError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formSubmit, setFormSubmit] = useState(false);

    useEffect(() => {
        handlePasswordError()
    }, [confirmPassword])

    const handlePasswordError = () => {
        if (confirmPassword !== passwordValue) {
            setShowPasswordError(true);
        } else {
            setShowPasswordError(false)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("https://nwj-chat-app-api.herokuapp.com/add_user", {name: nameValue, email: emailValue, password: passwordValue})
        .then(response => {
            alert('Account Created Successfully')
            setFormSubmit(true)
            setPage('Home')
            setLoading(false)
        }).catch(error => {
            setShowLoginError(true);
        })
    }

       return(
        <div className='new-user'>
            <form className='new-user__form' onSubmit={handleSubmit}>
            <label className='new-user__form__name-label'>Name</label>
            <input name='name' className='new-user__form__name' value={nameValue} onChange={e => setNameValue(e.target.value)} placeholer='Name' />
            <label className='new-user__form__email-label'>Email</label>
            <input name='email' className='new-user__form__email' value={emailValue} onChange={e => setEmailValue(e.target.value)} placeholer='Email' />

            <label className='new-user__form__password-label'>Password</label>
            <input name='password' className='new-user__form__password' type='password' value={passwordValue} onChange={e => setPasswordValue(e.target.value)} placeholer='Password' />
            <label className='new-user__form__confirm-label'>Confirm Password</label>
            <input className='new-user__form__confirm' type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholer='Confirm Password' />
            <input className='new-user__form__submit' type='submit' />
            </form>
            {showPasswordError ? <div className='new-user__error-message'>Passwords do not match</div> : null}
            {showLoginError ? <div className='new-user__error-message'>Error with credentials, try again</div> : null}
            <button onClick={() => setPage('Home')} className='new-user__back-button'>Back</button>
            {formSubmit && loading ? <LoadingIcon /> : null}
        </div>
       );
}