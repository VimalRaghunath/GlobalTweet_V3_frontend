import React from "react";
import Box from "@mui/material/Box";
import { Avatar } from "@mui/material";
import Sidebar from "./Sidebar/Sidebar";

function UserListItem({ handleFunction,user }) {

  return (
    <div style={{display:"flex", alignItems:"center",justifyContent:"center",position:"relative", right:"16rem"}}>
        <Sidebar/>
      <Box 
        onClick={handleFunction}
        cursor="pointer"
      >
     <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
      <Avatar
        src={user.Avatar}
      />
      <Box>
        <text>{user.name}</text><br/>
         {user.email}
      </Box>
      </div>
      </Box>
    </div>
  );
}

export default UserListItem;
