import axios from 'axios';
import React, { useEffect, useState } from 'react';

import AddMessage from './addMessage';
import Message from './message';
import LoadingIcon from '../loadingIcon';

export default function Messages(props) {
        const { user, activeGroup } = props;
        const [messagesList, setMessagesList] = useState([]);
        const [messageAdded, setMessageAdded] = useState(false);
        const [messageDeleted, setMessageDeleted] = useState(false);
        const [loading, setLoading] = useState(true);

        const fetchMessages = () => {
          axios.get("https://nwj-chat-app-api.herokuapp.com//messages").then(response => {
            setMessagesList(response.data.messages)
            setLoading(false);
          }).catch(error => {
            console.log(error);
          })
        }

        useEffect(() => {
          fetchMessages()
          setLoading(true);
          setMessageAdded(false);
          setMessageDeleted(false);
        }, [messageAdded, messageDeleted])

       return(
         <div className='messages'>
           <div className='messages__title'>{activeGroup.name}</div>
           {user.id == activeGroup.adminUser ? <div className='messages__admin'>You Have Admin Access. Click on Messages to Delete them</div> : null}
            <div className='messages__list'>
              {messagesList.map((message, index) => {
                if (message.group_id == activeGroup.code) {
                return (
                  <Message
                    key={message.id}
                    id={message.id}
                    userId={message.user_id}
                    setMessageDeleted={setMessageDeleted}
                    text={message.text}
                    activeGroup={activeGroup}
                    user={user}
                  />
                )}
              })}
            </div>
            {loading ? <LoadingIcon /> : null}
            <AddMessage
              setMessageAdded={setMessageAdded}
              activeGroup={activeGroup}
              user={user} messagesList={messagesList}
              setMessagesList={setMessagesList}
            />
         </div>
       );
}