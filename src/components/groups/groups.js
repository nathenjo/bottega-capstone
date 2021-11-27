import React, { useEffect, useState } from 'react';
import CreateGroup from './createGroup';
import GroupList from './groupList';

export default function Groups(props) {
    const [groups, setGroups] = useState(['Group Name 1']);

    useEffect(() => {
      console.log(props.listOfGroups);
    }, [groups])

    const renderGroups = (listOfGroups) => {
      return listOfGroups.map(group => {
        return group
      })
    }

       return(
         <div className='groups'>
             <CreateGroup updateGroups={setGroups} groups={groups} />
             <GroupList loginStatus={props.loginStatus} groups={groups} />
         </div>
       );
}