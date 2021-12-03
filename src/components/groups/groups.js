import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CreateGroup from './createGroup';
import GroupList from './groupList';

export default function Groups(props) {
    const { user } = props.user;
    const [groups, setGroups] = useState([]);

    const setGroupsList = () => {
      axios.get("http://localhost:5000/groups").then(response => {
        console.log(response.data.groups);
        setGroups(response.data.groups)
      }).catch(error => {
        console.log(error);
      })
    }

    useEffect(() => {
      setGroupsList()
    }, [])

    const renderGroups = (listOfGroups) => {
      return listOfGroups.map(group => {
        return group
      })
    }

       return(
         <div className='groups'>
             <CreateGroup updateGroups={setGroups} groups={groups} />
             <GroupList user={props.user} loginStatus={props.loginStatus} groups={groups} />
         </div>
       );
}