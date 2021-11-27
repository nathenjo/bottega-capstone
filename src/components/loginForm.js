import React, { useState } from 'react';

export default function LoginForm(props) {
    const {handleSubmit, emailValue, passwordValue, setEmailValue, setPasswordValue, loginStatus} = props;
       return(
        <div className='login'>
        {!loginStatus ?
        <form className='login__form' onSubmit={handleSubmit}>
        <label className='login__form__email-label'>Email</label>
        <input className='login__form__email' type='email' value={emailValue} onChange={e => setEmailValue(e.target.value)} placeholer='Email' />

        <label className='login__form__password-label'>Password</label>
        <input className='login__form__password' type='password' value={passwordValue} onChange={e => setPasswordValue(e.target.value)} placeholer='Password' />
        <input className='login__form__submit' type='submit' />
        </form> : null}
        </div>
       );
}