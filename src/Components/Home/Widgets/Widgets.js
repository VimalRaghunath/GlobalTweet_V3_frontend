import React, { useState, useEffect } from "react";
import "./Widgets.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { AxiosInstance } from "../../AxiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSnackbar } from "notistack";

function Widgets() {
  const [peoples, setPeoples] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [cookie, ] = useCookies(["cookies"]);
  const { enqueueSnackbar,  } = useSnackbar();


    async function getall() {
      const profiles = await AxiosInstance.get("/api/user/allusers",
     { headers: {
        Authorization: `Bearer ${cookie.cookies}`,
      }}, { id });

      setPeoples(profiles.data);
    }


  useEffect(()=>{
getall()
  },[])

  const handleFollow = async (userId) => {
    try {
      await AxiosInstance.post(`/api/user/follow/${userId}`, null, {
        headers: {
          Authorization: `Bearer ${cookie.cookies}`,
        },
      });
      enqueueSnackbar('you have followed successfully')
      const logedinuser = localStorage.getItem("user");
      const currentUser = JSON.parse(logedinuser);
      const follow = currentUser?.following;

      const lastIndex = follow.length - 1;
      if (userId !== follow[lastIndex]) {
        follow.push(userId);
        currentUser.following = follow;
        localStorage.setItem("user", JSON.stringify(currentUser));
      }
      getall()
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      await AxiosInstance.post(`/api/user/unfollow/${userId}`, null, {
        headers: {
          Authorization: `Bearer ${cookie.cookies}`,
        },
      });
      enqueueSnackbar('you have unfollowed successfully')
      const logedinuser = localStorage.getItem("user");
      const currentUser = JSON.parse(logedinuser);
      const follow = currentUser?.following;
      if (follow.includes(userId)) {
      const index = follow.indexOf(userId);
      if (index !== -1) {
        follow.splice(index, 1);
        currentUser.following = follow;
        localStorage.setItem("user", JSON.stringify(currentUser));
      }
    }
      getall()
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  const isFollowing = (userid) => {
    const logedinuser = localStorage.getItem("user");
    const currentUser = JSON.parse(logedinuser);
    return currentUser?.following.includes(userid);
  };

  return (
    <div className="Widgets">
      <b>Who to follow</b>

      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {peoples?.map((name) => (
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                style={{ width: "50px", height: "50px" }}
                alt="Remy Sharp"
                src={name?.Avatar}
              />
            </ListItemAvatar>
            <ListItemText
              onClick={() => navigate(`/userbyid/${name?._id}`)}
              primary={name?.username}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {name?.name}
                  </Typography>
                </React.Fragment>
              }
            />

            {isFollowing(name._id) ? (
              <button
                className="unfollowbutton"
                onClick={() => handleUnfollow(name._id)}
              >
                {" "}
                Unfollow{" "}
              </button>
            ) : (
              <button
                className="followbutton"
                onClick={() => handleFollow(name._id)}
              >
                {" "}
                Follow{" "}
              </button>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Widgets;
