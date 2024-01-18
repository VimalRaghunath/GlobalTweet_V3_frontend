import React, { useState,useEffect } from 'react'
import "./Widgets.css"
import List from "@mui/material/List"
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { AxiosInstance } from '../../AxiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Widgets() {
 
//  const [state,setState] = useState("")
 const [peoples,setPeoples] = useState([])
 const navigate = useNavigate();
 const { id } = useParams();
 const [cookie, removecookie] = useCookies(["cookies"]);


 useEffect(() => {
  async function getall() {
    const profiles = await AxiosInstance.get("/api/user/allusers",{ id });
    // console.log(post);
    setPeoples(profiles.data);
    // console.log("profiles",profiles.data);
  }
  getall();
}, []);


  // const handleUsersdetails = () => {
  //   navigate(`/api/User/allusers/${peoples._id}`)
  // }

  const handleFollow = async (userId) => {
    try {
      console.log(cookie.cookies);
      await AxiosInstance.post(`/api/user/follow/${userId}`, {
        headers: {
          Authorization:`bearer ${cookie.cookies}`,
        },
      });
      console.log("s");
    } catch (error) {
      console.error("Error following user:", error);
    }
  };
  

  const handleUnfollow = async (userId) => {

    try {
      await AxiosInstance.post(`/api/user/unfollow/${userId}`);
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };
// console.log(peoples);

  return (
    <div className='Widgets'>
       <b>Who to follow</b>
         

       <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {peoples?.map((name)=>(
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar style={{ width: '50px', height: '50px' }} alt="Remy Sharp" src={name?.Avatar} />
        </ListItemAvatar>
        <ListItemText onClick={()=>navigate(`/userbyid/${name?._id}`)} 
          primary=  {name?.username}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
              {name?.name}
              </Typography>
          
              
                 
             </React.Fragment>
          }
          />


                 
                 <button className='followbutton' onClick={() => handleUnfollow(name._id)}> Unfollow </button> 
                 
              
                   <button className='followbutton' onClick={() => handleFollow(name._id)}> Follow </button>
                   

      
      </ListItem>
))}
      {/* <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="@Arshadkallarakkal"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Arshad Kallarakkal
              </Typography>
              <button className='followbutton'> Follow </button>
            </React.Fragment>
          }
          
        />
        
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="@Akhilck"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Akhil C K
              </Typography>
             <button className='followbutton'> Follow </button>
            </React.Fragment>
          } 
        />      
       
      </ListItem> */}
      
    </List>
    
   
  

    </div>
  
    
  ) 
}

export default Widgets




   