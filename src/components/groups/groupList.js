import React from 'react';
import DeleteButton from './deleteButton';

export default function GroupList(props) {

  const { user, groups, setGroupDeleted, setActiveGroup, setPage } = props;

  const handleDisplayMessages = (group) => {
    setActiveGroup(group);
    setPage('Messages');
  }

  return(
    <div className='group-list'>
      {groups.map(group => {
        if (group.user_id == user.id) {
        return (
          <div className='group-list__group' key={group.id}>
            <div onClick={handleDisplayMessages} className='group-list__group-name'>{group.name}</div>
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