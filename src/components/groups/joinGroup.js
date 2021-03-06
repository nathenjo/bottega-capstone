import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingIcon from '../loadingIcon';

export default function JoinGroup(props) {
    const { user, groups, setGroupJoined } = props;

    useEffect(() => {
    
    }, [])

    const [groupCode, setGroupCode] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);
    const [loading, setLoading] = useState(true);
    const [joinSubmit, setJoinSubmit] = useState(false);


    const handleSubmit = () => {
        groups.map(group => {
            if (group.code == groupCode) {
                setJoinSubmit(true);
                axios.post("https://nwj-chat-app-api.herokuapp.com/add_group", {name: group.name, code: group.code, adminUser: group.adminUser, user_id: user.id}).then(response => {
                    setGroupJoined(true);
                    setErrorMessage(false);
                    setGroupCode('');
                    setLoading(false);
                }).catch(error => {
                    setErrorMessage(true);
                })
            }
        })
    }

       return(
         <div className='join-group'>
            <label className='join-group__label'>Join Group</label>
            <input 
                className='join-group__input'
                placeholder='7 Digit Code'
                maxLength='7'
                value={groupCode}
                onChange={(e) => setGroupCode(e.target.value.toUpperCase())}
            />
            <button className='join-group__button' onClick={handleSubmit}>Submit</button>
            {loading && joinSubmit ? <LoadingIcon /> : null}
            {errorMessage ? <div className='join-group__error'>Error with Group Code, try again</div> : null}
         </div>
       );
}