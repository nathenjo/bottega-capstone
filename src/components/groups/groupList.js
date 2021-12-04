import React from 'react';
import axios from 'axios';

export default function GroupList(props) {

  const { user, groups, setGroupDeleted } = props;


  return(
    <div className='group-list'>
      {groups.map(group => {
        if (group.user_id == user.id) {
        return (
          <div className='group-list__group' key={group.id}>
            <div className='group-list__group-name'>{group.name}</div>
            <button className='group-list__group-button' onClick={() => axios.delete(`http://localhost:5000/groups/${group.id}`).then(response => {
              setGroupDeleted(true)
            }).catch(error => {
              console.log(error);
            })}>Delete</button>
          </div>
        )}
      })}
    </div>
  );
}