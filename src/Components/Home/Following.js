import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar/Sidebar'
import { useCookies } from 'react-cookie'
import { AxiosInstance } from '../AxiosInstance'
import { useNavigate } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import { List, ListItem, ListItemText, ListItemAvatar } from '@mui/material'
import Avatar from "@mui/material/Avatar";



function Following() {

  const [cookie,setCookie] = useCookies(["cookies"])
  const [followinglist,setFollowinglist] = useState([])
  const navigate = useNavigate()


  const user=JSON.parse(localStorage.getItem("user"))
  const userId=user?._id ;

  const followings = async () => {
    try {
      const lists = await AxiosInstance.get(`/api/user/following/${userId}`, {
        headers: {
          Authorization: `bearer ${cookie.cookies}`,
        },
      });
      setFollowinglist(lists.data.following);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    followings()
  }, []);

  return (
   <div style={{display:"flex",justifyContent:"center",paddingRight:"40rem"}} >
    <div>
      <Sidebar/>
    </div>
    <div>
    <List  sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }} >

{ followinglist.map((item)=>(
  <div key={item._id}>
  <ListItem  alignItems="flex-start">
    <ListItemAvatar>
      <Avatar
        style={{ width: "50px", height: "50px" }}
        alt="Remy Sharp"
        src={item?.Avatar}
      />
    </ListItemAvatar>
    <ListItemText
      onClick={() => navigate(`/userbyid/${item?._id}`)}
      primary={item?.username}
      secondary={
        <React.Fragment>
          <Typography
            sx={{ display: "inline" }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {item?.name}
          </Typography>
        </React.Fragment>
      }
    />
  </ListItem>
  </div>
))}

</List>
    </div>
   </div>
  )
}

export default Following
