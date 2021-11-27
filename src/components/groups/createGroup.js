import React, { useEffect, useState } from 'react';

export default function CreateGroup(props) {

    const [show, setShow] = useState(false)
    const [groupName, setGroupName] = useState('')
    const [groupCode, setGroupCode] = useState('')

    useEffect(() => {
        
    }, [show])

    const handleSubmit = (event) => {
        event.preventDefault();
        props.updateGroups(props.groups.concat(groupName))
        setGroupName('')
        setGroupCode('')
        setShow(false)
    }

    const handleClickShow = () => {
        setShow(!show)
    }


       return(
           <div className='create-group'>
            <button className='create-group__button' onClick={handleClickShow}>Create Group</button>
            {show ?
            <form className='create-group-form' onSubmit={handleSubmit}>
              <label className='create-group-form__name-label'>Group Name</label>
              <input className='create-group-form__name-input' type='text' value={groupName} onChange={e => setGroupName(e.target.value)} placeholer='Group Name' />

              <label className='create-group-form__code-label'>Group Code</label>
              <input className='create-group-form__code-input' type='text' value={groupCode.toUpperCase()} onChange={e => setGroupCode(e.target.value)} placeholer='Group Code' />
              <input type='submit' />
              <p className='create-group-form__subtitle'>This code will be used for others to join the group</p>
            </form>
            : null}
         </div>
       );
}