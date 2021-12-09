import React, { useEffect, useState } from 'react';
import axios from 'axios';

import CreateGroup from './createGroup';
import GroupList from './groupList';
import JoinGroup from './joinGroup';

export default function Groups(props) {
  const { user, setPage, setActiveGroup } = props;
  
  const [groups, setGroups] = useState([]);
  const [groupCreated, setGroupCreated] = useState(false);
  const [groupDeleted, setGroupDeleted] = useState(false);
  const [groupJoined, setGroupJoined] = useState(false);

  const setGroupsList = () => {
    axios.get("https://nwj-chat-app-api.herokuapp.com/groups").then(response => {
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
        <CreateGroup
          setGroupCreated={setGroupCreated}
          user={user}
          updateGroups={setGroups}
          groups={groups}
        />
        <JoinGroup user={user} groups={groups} setGroupJoined={setGroupJoined} />
        <GroupList
          setPage={setPage}
          setActiveGroup={setActiveGroup}
          setGroupDeleted={setGroupDeleted}
          user={user}
          groups={groups}
        />
      </div>
  );
}