import axios from 'axios';
import React, { useEffect, useState } from 'react';

import AddMessage from './addMessage';
import Message from './message';

export default function Messages(props) {
        const { user, activeGroup } = props;
        const [messagesList, setMessagesList] = useState([]);
        const [messageAdded, setMessageAdded] = useState(false);
        const [messageDeleted, setMessageDeleted] = useState(false);

        const fetchMessages = () => {
          axios.get("http://localhost:5000/messages").then(response => {
            setMessagesList(response.data.messages)
          }).catch(error => {
            console.log(error);
          })
        }

        useEffect(() => {
          fetchMessages()
          setMessageAdded(false)
          setMessageDeleted(false)
        }, [messageAdded, messageDeleted])

       return(
         <div className='messages'>
           <div className='messages__title'>{activeGroup.name}</div>
           {user.id == activeGroup.adminUser ? <div className='messages__admin'>You Have Admin Access. Click on Messages to Delete them</div> : null}
            <div className='messages__list'>
              {messagesList.map((message, index) => {
                if (message.group_id == activeGroup.code) {
                  let individualUser = {}
                  axios.get(`http://localhost:5000/users/${message.user_id}`).then(response => {
                    let individualUser = response.data.user
                    console.log(individualUser);
                  })
                return (
                  <Message
                    key={message.id}
                    setMessageDeleted={setMessageDeleted}
                    image={user.image_url}
                    name={individualUser.name}
                    text={message.text}
                    activeGroup={activeGroup}
                    user={user}
                  />
                )}
              })}
            </div>
            <AddMessage
              setMessageAdded={setMessageAdded}
              activeGroup={activeGroup}
              user={user} messagesList={messagesList}
              setMessagesList={setMessagesList}
            />
         </div>
       );
}