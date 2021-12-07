import axios from 'axios';
import React, { useEffect, useState } from 'react';

import AddMessage from './addMessage';

export default function Messages(props) {
        const { user, activeGroup } = props;
        const [messagesList, setMessagesList] = useState([]);
        const [messageAdded, setMessageAdded] = useState(false)

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
        }, [messageAdded])


       return(
         <div className='messages'>
           <div className='messages__title'>{activeGroup.name}</div>
            <div className='messages__list'>
              {messagesList.map(message => {
                return (
                  <div key={message.id} className='messages__list__message'>
                    {message.text}
                  </div>
                )
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