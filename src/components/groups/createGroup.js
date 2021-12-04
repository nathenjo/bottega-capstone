import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function CreateGroup(props) {
    const { updateGroups, groups, user, setGroupCreated } = props;

    const [display, setDisplay] = useState({display: 'none'})
    const [showForm, setShowForm] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [groupCode, setGroupCode] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:5000/add_group", {name: groupName, code: groupCode, user_id: user.id}).then(response => {
          setGroupCreated(true);
        }).catch(error => {
          console.log(error);
        })
        setGroupName('')
        setGroupCode('')
        setDisplay({display: 'none'});
        setShowForm(false);
    }

    const handleClickDisplay = () => {
        setDisplay({display: 'initial'})
        setShowForm(true);
    }

    const handleClickHide = () => {
      setDisplay({display: 'none'})
      setShowForm(false);
  }


       return(
           <div className='create-group'>
            {!showForm ? <button className='create-group__create-button' onClick={handleClickDisplay}>Create Group</button> : ''}
            <button style={display} className='create-group__back-button' onClick={handleClickHide}>Back</button>
            {showForm ? <form className='create-group-form' onSubmit={handleSubmit}>
              <label className='create-group-form__name-label'>Group Name</label>
              <input className='create-group-form__name-input' type='text' value={groupName} onChange={e => setGroupName(e.target.value)} placeholer='Group Name' />

              <label className='create-group-form__code-label'>Group Code</label>
              <input maxLength='7' className='create-group-form__code-input' type='text' value={groupCode.toUpperCase()} onChange={e => setGroupCode(e.target.value)} placeholer='Group Code' />
              <p className='create-group-form__subtitle'>This code will be used for others to join the group</p>
              <input className='create-group-form__submit' type='submit' />
            </form> : <div/>}
         </div>
       );
}