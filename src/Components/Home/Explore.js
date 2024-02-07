import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import "./Explore.css";
import { TextField, Button, CircularProgress } from "@mui/material";
import { ChatState } from "../Context/ChatProvider";
import { AxiosInstance } from "../AxiosInstance";
import { useCookies } from "react-cookie";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ChatLoading from "./ChatLoading";

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
    // try {
    //   setLoading(true);
    //   const response = await fetch(
    //     `/api/search?query=${encodeURIComponent(query)}`
    //   );
    //   const data = await response.json();
    //   setResults(data);
    // } catch (error) {
    //   console.error("Error searching:", error.message);
    //   setError("An error occurred while searching. Please try again ");
    // } finally {
    //   setLoading(false);
    // }
  };

  useEffect(()=>{
    handleSearch();
  },[])

  return (
   <div style={{ width: "100%" }}>
    <div className="Explore">
      <Sidebar />

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
   
    {loading ? (
      <ChatLoading/>
    ):(
      <span>Results</span>
    )}
   </div>
  );
}


export default Explore;
