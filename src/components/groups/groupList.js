import React, {useEffect, useState} from 'react';

import DeleteButton from './deleteButton';
import Group from './group';

export default function GroupList(props) {

  const { user, groups, setGroupDeleted, setActiveGroup, setPage } = props;

  return(
    <div className='group-list'>
      {groups.map(group => {
        if (group.user_id == user.id) {
        return (
          <div className='group-list__group' key={group.id}>
            <Group id={group.id} onClick={() => setActiveGroup(group) & setPage('Messages')} className='group-list__group-name' name={group.name} />
            {group.adminUser == user.id ?
              <DeleteButton group={group} text={'Delete Group'} setGroupDeleted={setGroupDeleted} />
            :
              <DeleteButton group={group} text={'Leave Group'} setGroupDeleted={setGroupDeleted} />}
          </div>
        )}
      })}
    </div>
  );
}