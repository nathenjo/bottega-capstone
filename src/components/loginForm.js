import React, { useState } from 'react';

export default function LoginForm({ Login }) {
    const [details, setDetails]  = useState({email: '', password: ''})

    const handleSubmit = (event) => {
        event.preventDefault()
        Login(details);
    }
       return(
         <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' id='email' onChange={e => setDetails({...details, email: e.target.value})} value={details.email} />

            <label htmlFor='password'>Password</label>
            <input type='password' name='password' id='password' onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>

            <input type='submit' value='Login' />
         </form>
       );
}