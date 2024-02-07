import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import "./Explore.css";
import { TextField, Button, CircularProgress } from "@mui/material";
import { ChatContext, ChatState } from "../Context/ChatProvider";
import { AxiosInstance } from "../AxiosInstance";
import { useCookies } from "react-cookie";
import Box from '@mui/material/Box';
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";

function Explore({ userId }) {
  // const [query, setQuery] = useState('')
  // const [results, setResults] = useState([])
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState(null)
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const [cookie, ] = useCookies(["cookies"]);


  const  user = JSON.parse(localStorage.getItem("user"))
  const {setSelectedChat,chats,setChats}=useContext(ChatContext)

  const handleSearch = async () => {

    if (search) {
      try {
        setLoading(true)

        const config = await AxiosInstance.get(`/api/user/explore?search=${search}`,{
          headers:{
            Authorization: `bearer ${cookie.cookies}`
          },
        })
        setLoading(false)
        setSearchResult(config.data)

      } catch (error) {
        console.log(error.message);
      }
    }
    
  };
  useEffect(()=>{
    handleSearch();
  },[])

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true)
      const config = await AxiosInstance.get("/api/user/chat",{userId},{
        headers:{
          "Content-type": "application/json",
          Authorization: `bearer ${cookie.cookies}`
        },
      })
      if(!chats.find((c) => c._id === config.data._id)) setChats([config.data, ...chats])
      setLoadingChat(false)
      setSelectedChat(config.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
    accessChat()
  },[]);


  return (
   <div style={{ width: "100%" }}>
    <Sidebar/>
    <div className="Explore">

    <Box sx={{ display: 'flex' }}>
      <input 
        className="Inputbox"
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
      />

      <Button onClick={handleSearch}>Search</Button>
      
    </Box>
    </div>
   
    {loading ? 
      <ChatLoading/>
    :(
      searchResult?.map((user)=>(
        <UserListItem key={user._id}
            user={user}
            handleFunction={()=>accessChat(user._id)}
        />
      ))
    )}
    
   </div>
  );
}


export default Explore;
