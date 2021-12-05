import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function JoinGroup(props) {
    const { user } = props;

    useEffect(() => {
    
    }, [])

    const [groupCode, setGroupCode] = useState('');
    const [group, setGroup] = useState({});

    const handleSubmit = () => {
        axios.get("http://localhost:5000/groups").then(response => {
            response.data.groups.map(group => {
                if (group.code == groupCode) {
                    console.log('Match');
                    setGroup(group);
                }
            })
        }).catch(error => {
            console.log(error);
        });
        axios.post("http://localhost:5000/add_group", {name: group.name, code: group.code, user_id: user.id}).then(response => {
          console.log(response);
        }).catch(error => {
          console.log(error);
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
         </div>
       );
}