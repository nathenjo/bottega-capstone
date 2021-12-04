import axios from 'axios';
import React, { useEffect, useState } from 'react';

import AddMessage from './addMessage';

export default function Messages(props) {
        const { user } = props;
        const [messagesList, setMessagesList] = useState([]);

        useEffect(() => {
          fetchMessages()
        }, [])

        const fetchMessages = () => {
          axios.get("http://localhost:5000/messages")
        }

        const renderMessages = () => {
          let messages = [];
          messages = messagesList.map((message, index) => {
              return <div key={index} className={`messages__${index} messages__message`}>{user.name}{message}</div>
          })
          return messages
        }

       return(
         <div className='messages'>
            <div className='messages__list'>
              {renderMessages()}
            </div>
            <AddMessage user={props.user} messagesList={messagesList} setMessagesList={setMessagesList} />
         </div>
       );
}