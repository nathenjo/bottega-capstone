import React, { useState } from 'react';

import AddMessage from './addMessage';

export default function Messages(props) {
        const { name } = props.user;
        const [messagesList, setMessagesList] = useState([]);

        const renderMessages = () => {
          // STYLE
          let messages = [];
          messages = messagesList.map((message, index) => {
              return <div key={index} className={`messages__${index} messages__message`}>{props.user.name}{message}</div>
          })
          return messages
        }

       return(
         <div className='messages'>
            <div className='messages__list'>
              {renderMessages()}
            </div>
            <AddMessage messagesList={messagesList} setMessagesList={setMessagesList} />
         </div>
       );
}