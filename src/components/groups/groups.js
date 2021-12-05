import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CreateGroup from './createGroup';
import GroupList from './groupList';
import JoinGroup from './joinGroup';
import Messages from '../messages/messages';

export default function Groups(props) {
    const { user, page, setPage, pullData } = props;
    const [groups, setGroups] = useState([]);
    const [groupCreated, setGroupCreated] = useState(false);
    const [groupDeleted, setGroupDeleted] = useState(false);
    const [groupJoined, setGroupJoined] = useState(false);
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
      setGroupJoined(false);
    }, [groupCreated, groupDeleted, groupJoined])

       return(
         <div className='groups'>
            <CreateGroup setGroupCreated={setGroupCreated} user={user} updateGroups={setGroups} groups={groups} />
            <JoinGroup user={user} groups={groups} setGroupJoined={setGroupJoined} />
            <GroupList 
              setPage={setPage}
              activeGroup={activeGroup}
              setActiveGroup={setActiveGroup}
              setGroupDeleted={setGroupDeleted}
              user={user}
              groups={groups}
            />
            {page == 'Messages' ? <Messages activeGroup={activeGroup} user={user} /> : 'Groups'}
         </div>
       );
}