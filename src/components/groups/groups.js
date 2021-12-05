import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CreateGroup from './createGroup';
import GroupList from './groupList';
import Messages from '../messages/messages';
import JoinGroup from './joinGroup';

export default function Groups(props) {
    const { user, setPage } = props;
    const [groups, setGroups] = useState([]);
    const [groupCreated, setGroupCreated] = useState(false);
    const [groupDeleted, setGroupDeleted] = useState(false);
    const [activeGroup, setActiveGroup] = useState({});

    const setGroupsList = () => {
      axios.get("http://localhost:5000/groups").then(response => {
        setGroups(response.data.groups)
      }).catch(error => {
        console.log(error);
      })
    }

    useEffect(() => {
      setGroupsList()
      setGroupCreated(false);
      setGroupDeleted(false);
    }, [groupCreated, groupDeleted])

       return(
         <div className='groups'>
             <CreateGroup setGroupCreated={setGroupCreated} user={user} updateGroups={setGroups} groups={groups} />
             <JoinGroup user={user} />
             <GroupList setPage={setPage} activeGroup={activeGroup} setActiveGroup={setActiveGroup} setGroupDeleted={setGroupDeleted} user={user} groups={groups} />
         </div>
       );
}