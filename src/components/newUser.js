import React, { useEffect, useState } from 'react';

export default function NewUser(props) {
    const {
        setPage,
        setUser,
        emailValue,
        setEmailValue,
        passwordValue,
        setPasswordValue
    } = props;
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showError, setShowError] = useState(false);

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
    }
       return(
        <div className='new-user'>
            <form className='new-user__form' onSubmit={handleSubmit}>
            <label className='new-user__form__email-label'>Email</label>
            <input className='new-user__form__email' type='email' value={emailValue} onChange={e => setEmailValue(e.target.value)} placeholer='Email' />

            <label className='new-user__form__password-label'>Password</label>
            <input className='new-user__form__password' type='password' value={passwordValue} onChange={e => setPasswordValue(e.target.value)} placeholer='Password' />
            <label className='new-user__form__confirm-label'>Confirm Password</label>
            <input className='new-user__form__confirm' type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholer='Confirm Password' />
            <input className='new-user__form__submit' type='submit' />
            </form>
            {showError ? <div className='new-user__error-message'>Passwords do not match</div> : null}
            <button onClick={() => setPage('Home')} className='new-user__back-button'>Back</button>
        </div>
       );
}