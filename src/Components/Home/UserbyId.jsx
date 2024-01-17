import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../AxiosInstance";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

import {
  Avatar,
  // Card,
  // CardActions,
  // CardContent,
  // CardHeader,
  // CardMedia,
  // IconButton,
  // Typography, 
} from "@mui/material";
import Sidebar from "./Sidebar/Sidebar";
import Widgets from "./Widgets/Widgets";

const UserbyId = () => {
  const [userById, setUserById] = useState({});
  // const [state, setState] = useState("");
  const { userId } = useParams();
  const [cookie, setCookie] = useCookies("cookies");

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const user = await AxiosInstance.get(
          `/api/user/getuserbyid/${userId}`,
          {
            headers: {
              Authorization: `bearer ${cookie.cookies}`,
            },
          }
        );

        setUserById(user.data);
      } catch (error) {
        console.error("Error fetching user by ID:", error);
      }
    };

    fetchUserById();
  }, [userId, cookie.cookies]);

  return (
    <>
      <div>
        <Sidebar />
      </div>
      <div className="Profile">
        <div className="Profilecontent">
          <div className="Profileheader">
            <Avatar
              src={userById.Avatar}
              alt="avtar"
              className="Profileavatar"
            />
            <div className="Profiletitles">
              <h3>{userById.name}</h3>
              <h4>{userById.username}</h4>
              <p>{userById.bio}</p>
            </div>
          </div>

          <div>
            <u>
              <h2 style={{ textAlign: "center" }}>All Posts</h2>
            </u>
          
          </div>
        </div>

        <div className="Widgets">
          <Widgets />
          <div></div>
        </div>
      </div>
    </>
  );
};

export default UserbyId;
