import axios from 'axios';
import React, { useEffect, useState } from 'react';

import AddMessage from './addMessage';

export default function Messages(props) {
        const { user, activeGroup } = props;
        const [messagesList, setMessagesList] = useState([]);
        const [users, setUsers] = useState([]);
        const [messageAdded, setMessageAdded] = useState(false);
        const [messagesUserId, setMessagesUserId] = useState([]);

        const handleMessagesUserId = () => {
          axios.get("http://localhost:5000/messages").then(response => {
            let userIdArray = [];
            response.data.messages.map(message => {
              userIdArray.push(message.user_id)
              console.log(userIdArray);
            })
            setMessagesUserId(userIdArray.filter((c, index) => {
              return userIdArray.indexOf(c) === index;
          }));
          }).catch(error => {
            console.log(error);
          })
        }

        const fetchMessages = () => {
          axios.get("http://localhost:5000/messages").then(response => {
            setMessagesList(response.data.messages)
          }).catch(error => {
            console.log(error);
          })
        }

        const fetchUsers = () => {
          axios.get("http://localhost:5000/users").then(response => {
            setUsers(users.concat(response.data.users))
          }).catch(error => {
            console.log(error);
          })
        }

        useEffect(() => {
          handleMessagesUserId()
          fetchMessages()
          fetchUsers()
          setMessageAdded(false)
        }, [messageAdded])


       return(
         <div className='messages'>
           <div className='messages__title'>{activeGroup.name}</div>
            <div className='messages__list'>
              {messagesList.map(message => {
                return (
                  <div key={message.id} className='messages__list__message'>
                    <img className='messages__list__message__image' src={user.image_url} />
                    <div className='messages__list__message__name'>{user.name}</div>
                    <div className='messages__list__message__text'>{message.text}</div>
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