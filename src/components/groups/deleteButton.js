import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingIcon from '../loadingIcon';

export default function DeleteButton(props) {

    const { setGroupDeleted, text, groupId } = props;

    const [loading, setLoading] = useState(true);
    const [buttonClicked, setButtonClicked] = useState(false);

    useEffect(() => {

    }, [])

    const handleDeleteLeaveGroup = () => {
      setButtonClicked(true);
      axios.delete(`https://nwj-chat-app-api.herokuapp.com/groups/${groupId}`)
      .then(response => {
        setGroupDeleted(true);
        setLoading(false);
      }).catch(error => {
        console.log(error);
      })
    }

       return(
         <div>
        <button
          className='group-list__group-button'
          onClick={handleDeleteLeaveGroup}>
            {text}
          </button>
          {loading && buttonClicked ? <LoadingIcon /> : null}
          </div>
       );
}