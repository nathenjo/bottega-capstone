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
             return (
               <div className='group-list__group' ref={groupRef} key={Math.random()}>
                 <div className='group-list__group-name'>{group}</div>
                 <button className='group-list__group-button' onClick={props.loginStatus ? deleteGroup : null}>Remove Group</button>
                </div>
             )
           })}
         </div>
       );
}