import React from 'react';
import "./Sidebar.css";
import SidebarOption from './SidebarOption/SidebarOption';
import { Home, Search, NotificationsNone, MailOutline, PermIdentity } from "@mui/icons-material";
import Logo from "../../Assets/GlobalTweet.jpg";
import { Button, IconButton, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Box
      className="sidebar-container"
      position="fixed"
      top={0}
      left={0}
      height="100vh"
      width="280px"
      marginLeft='10px'
      bgcolor="#fff"
      boxShadow="0px 2px 5px rgba(0, 0, 0, 0.1)"
      zIndex="1000"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <img className='image' src={Logo} alt="Logo" />
      <div style={{ display: 'flex', flexDirection: "column" }}>
        <IconButton onClick={() => navigate("/home")}><SidebarOption active Icon={Home} text="Home" /></IconButton>
        <IconButton onClick={() => navigate("/explore")}><SidebarOption Icon={Search} text="Explore" /></IconButton>
        <IconButton onClick={() => navigate("/notifications")}><SidebarOption Icon={NotificationsNone} text="Notifications" /></IconButton>
        <IconButton onClick={() => navigate("/messages")}><SidebarOption Icon={MailOutline} text="Messages" /></IconButton>
        <IconButton onClick={() => navigate("/profile")}><SidebarOption Icon={PermIdentity} text="Profile" /></IconButton>
      </div>
      <Button onClick={() => navigate("/newpost")} className='Sidebarnewpost' variant='outlined' fullWidth>
        New Post
      </Button>
    </Box>
  );
};

export default Sidebar;
