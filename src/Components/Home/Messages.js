import React, { useContext, useEffect, useState } from 'react'
import Sidebar from './Sidebar/Sidebar'
import "./Messages.css"
import Box from '@mui/material/Box';
import { Button } from '@mui/material'
import { ChatContext, ChatState } from "../Context/ChatProvider";
import { AxiosInstance } from '../AxiosInstance';
import { useCookies } from 'react-cookie';



// const socket = io(AxiosInstance.get("/api/user/messages"))



const Messages = () => {
  // const [messagess, setMessagess] = useState([]);
  // const [newMessage, setNewMessage] = useState('');
  const [loggedUser,setLoggedUser] = useState()
  const  user = JSON.parse(localStorage.getItem("user"))
  const {selectedChat,setSelectedChat,chats,setChats}= useContext(ChatContext);
  const [cookie, ] = useCookies(["cookies"]);


  const fetchChats = async () => {
    try {
      const config = await AxiosInstance.get('/api/user/chat',{
        headers: {
          Authorization: `bearer ${cookie.cookies}`
        },
      })
      setChats(config.data);
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
    setLoggedUser(user)
    fetchChats()
  },[])

  console.log("hii",user);

  return (
  
  <div>
    <div style={{display:"flex", justifyContent:"center"}}>
     <Box>
        <h2>My Chats</h2>
      </Box>
     </div>
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
        className='InputBox1'
        // value={newMessage}
        // onChange={(e) => setNewMessage(e.target.value)}
      />

      <Button> 
        Send Message 
      </Button>
    </div>
  </div>
   <div style={{display:"flex", justifyContent:"center"}}>
     <Button variant="contained" color="success">
        New Group Chat
      </Button>
      </div>
</div>
);
};

export default Messages
