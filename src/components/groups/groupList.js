import React from 'react';
import axios from 'axios';

export default function GroupList(props) {
    
  const deleteGroup = () => {
    axios.delete(`http://localhost:5000/groups/${group.id}`)
  }

  return(
    <div className='group-list'>
      {props.groups.map(group => {
        if (group.user_id == props.user.id) {
        return (
          <div className='group-list__group' key={group.id}>
            <div className='group-list__group-name'>{group.name}</div>
            <button className='group-list__group-button' onClick={deleteGroup}>Delete</button>
          </div>
        )}
      })}
    </div>
  );
}