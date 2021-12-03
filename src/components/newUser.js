import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
    const [showError, setShowError] = useState(false);
    const [showLoginError, setShowLoginError] = useState(false);

    useEffect(() => {
        if (confirmPassword !== passwordValue) {
            setShowError(true);
        } else {
            setShowError(false)
        }
    }, [confirmPassword])

    const handleSubmit = (event) => {
        event.preventDefault();
        setUser({email: emailValue, password: passwordValue})
        axios.post("http://localhost:5000/add_user", {name: nameValue, email: emailValue, password: passwordValue})
        .then(response => {
            if (response.data.message == `"user ${nameValue} has been created successfully."`) {
                setLoginStatus(true)
                setPage('Groups')
            } else {
                setShowLoginError(true)
                setLoginStatus(false)
            }
        }).catch(error => {
            console.log(error);
        })
    }

    // method="POST" action="http://localhost:5000/users"

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
            {showError ? <div className='new-user__error-message'>Passwords do not match</div> : null}
            {showLoginError ? <div className='new-user__error-message'>Error with credentials, try again</div> : null}
            <button onClick={() => setPage('Home')} className='new-user__back-button'>Back</button>
        </div>
       );
}