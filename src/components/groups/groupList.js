import React, { useRef } from 'react';

export default function GroupList(props) {
    const groupRef = useRef();
      const deleteGroup = (event) => {
        groupRef.current.remove()
        // TODO
      }
       return(
         <div className='group-list'>
           {props.groups.map(group => {
             if (group.user_id == props.user.id) {
             return (
               <div className='group-list__group' key={group.id}>
                 <div className='group-list__group-name'>{group.name}</div>
                 <button className='group-list__group-button' onClick={props.loginStatus ? deleteGroup : null}>Delete</button>
                </div>
             )}
           })}
         </div>
       );
}