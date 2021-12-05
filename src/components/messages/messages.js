import axios from 'axios';
import React, { useEffect, useState } from 'react';

import AddMessage from './addMessage';

export default function Messages(props) {
        const { user, activeGroup } = props;
        const [messagesList, setMessagesList] = useState([]);

        const fetchMessages = () => {
          axios.get("http://localhost:5000/messages").then(response => {
            setMessagesList(response.data.messages)
          }).catch(error => {
            console.log(error);
          })
        }

        useEffect(() => {
          fetchMessages()
        }, [])


       return(
         <div className='messages'>
           {activeGroup.name}
            <div className='messages__list'>
              {messagesList.map(message => {
                return (
                  <div key={message.id} className={`messages__${message.id} messages__message`}>
                    {message.text}
                  </div>
                )
              })}
            </div>
            <AddMessage user={user} messagesList={messagesList} setMessagesList={setMessagesList} />
         </div>
       );
}