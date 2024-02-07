import React, { useState } from 'react'
import Sidebar from './Sidebar/Sidebar'
import "./Messages.css"
import { Button } from '@mui/material'


// const socket = io(AxiosInstance.get("/api/user/messages"))

const Messages = () => {
  // const [messagess, setMessagess] = useState([]);
  // const [newMessage, setNewMessage] = useState('');



  return (
  
  <div>
    <div className='Messages'>
    <Sidebar />
    <div className='Messagesbox'>
      {/* <ul>
        {messagess.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul> */}
      
      <input
        type="text"
        // value={newMessage}
        // onChange={(e) => setNewMessage(e.target.value)}
      />

      <Button> Send Message </Button>
    </div>
  </div>
</div>
);
};

export default Messages
