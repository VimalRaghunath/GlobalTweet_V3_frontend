import { Avatar, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Sidebar from "./Sidebar/Sidebar";
import Widgets from "./Widgets/Widgets";
import { AxiosInstance } from "../AxiosInstance";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import Editprofile from "./Editprofile";
import Editcoverphoto from "./Editcoverphoto";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

function Profile() {



  const [state, setState] = useState("");
  const [cookie, removecookie] = useCookies(["cookies"]);
  const [mypost, setMypost] = useState([]);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [coverphotoOpen, setCoverphotoOpen] = useState(false);
  const [liking, setLiking] = useState(false);
  const [commenting, setCommenting] = useState([]);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const newcookie = async () => {
    try {
      const posts = await AxiosInstance.get("/api/user/profile", {
        headers: {
          Authorization: `bearer ${cookie.cookies}`,
        },
      });
     
      setState(posts.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    newcookie();
  }, []); 
 

const user=JSON.parse(localStorage.getItem("user"))
const userId=user?._id

   
  const getFollowersCount = async () => {
    try {
      const followersCountResponse = await AxiosInstance.get(
        `/api/user/followersCount/${userId}`,
       
        {
          headers: {
            Authorization: `bearer ${cookie.cookies}`,
          },
        }
      );
  
      return setFollowerCount(followersCountResponse.data.count);
    } catch (error) {
      console.error("Error fetching followers count:", error);
    
      throw error;
    }
  };


  useEffect(() => {
    getFollowersCount();
  }, []); 
    

  const getFollowingCount = async () => {
    try {
      const followingCountResponse = await AxiosInstance.get(
        `/api/user/followingCount/${userId}`,
       
        {
          headers: {
            Authorization: `bearer ${cookie.cookies}`,
          },
        }
      );
  
      return setFollowingCount(followingCountResponse.data.count);
      
    } catch (error) {

      console.error("Error fetching followers count:", error);
    
      throw error;
    }
  };

  useEffect(() => {
    getFollowingCount();
  }, []); 
   

  useEffect(() => {

    async function newcookiess() {
      const userposts = await AxiosInstance.get("/api/user/profileposts", {
        headers: {
          Authorization: `bearer ${cookie.cookies}`,
        },
      });
      setMypost(userposts.data.data);
    }
    newcookiess();
  }, [liking]);

  const handleComment = (postId) => {
    setOpenCommentModal(true);
    setSelectedPostId(postId);
  };

  const handleCloseCommentModal = () => {
    setOpenCommentModal(false);
    setSelectedPostId(null);
    setCommentInput("");
  };

  const handleAddComment = async () => {
    try {
      await AxiosInstance.post("/api/user/comment/", {
        userId: mypost?.userpro?._id,
        postId: selectedPostId,
        text: commentInput,
      });

      setCommenting(commenting);
      handleCloseCommentModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProfileClick = () => {
    setEditProfileOpen(true);
  };

  const handleCloseEditProfile = () => {
    setEditProfileOpen(false);
  };

  const EditCoverphotoClick = () => {
    setCoverphotoOpen(true);
  };

  const CloseCoverphotoClick = () => {
    setCoverphotoOpen(false);
  };

  const handleLogout = () => {
    removecookie("cookies");
    localStorage.removeItem("user");
    navigate("/");
  };

 

  const handleLike = async (postId) => {
    try {
      const like = await AxiosInstance.post("/api/user/like/", {
        userId: state?.userpro?._id,
        postId: postId,
      });

      setLiking(!liking);
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();

  const viewComment = () => {
    const postId = selectedPostId;
    navigate(`/comments/${postId}`);
  };

  
  return (
    <>
      <div>
        <Sidebar />
      </div>
      <div className="Profile">
        <div className="Profilecontent">
          <div className="Profileheader">
            <Avatar
              style={{ width: "100px", height: "100px" }}
              src={state?.userpro?.Avatar}
              alt={state?.userpro?.username}
              className="Profileavatar"
            />
            <div className="Profiletitles">
              <h3>{state?.userpro?.name}</h3>
              <h4>{state?.userpro?.username}</h4>
              <p>{state?.userpro?.bio}</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "20rem",
              }}
            >
              <div>
                <Button onClick={() => navigate("/followers")}>
                  Followers({followerCount}) 
                </Button>
              </div>
              <div>
                <Button onClick={() => navigate("/following")}>
                  Following({followingCount})
                </Button>
              </div>
            </div>
          </div>

          <div>
            <u>
              <h2 style={{ textAlign: "center" }}>My Posts</h2>
            </u>
            <Card sx={{ maxWidth: 545 }}>
              {mypost.map((post) => (
                <div key={post?._id}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" src={post?.userId?.Avatar} />
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={post?.userId?.username}
                    subheader="September 14, 2016"
                  />

                  {post?.image ? (
                    <CardMedia
                      component="img"
                      image={post?.image}
                      alt="Paella dish"
                    />
                  ) : (
                    <h1>No posts found</h1>
                  )}

                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {post?.description}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton
                      aria-label="add to favorites"
                      onClick={()=>{handleLike(post._id)}}
                    >
                      <FavoriteIcon />
  
                    </IconButton>
                    <Typography variant="body2" color="text.secondary">
                      {post?.likes.length}
                    </Typography>
                    <IconButton
                      aria-label="comment"
                      onClick={() => handleComment(post._id)}
                    >
                      <ChatBubbleOutlineRoundedIcon />
                    </IconButton>
                    <Typography variant="body2" color="text.secondary">
                      {post?.comments.length}
                    </Typography>
                    &nbsp;
                    <IconButton aria-label="retweet">
                      <RepeatRoundedIcon />
                    </IconButton>
                    &nbsp;
                    <IconButton aria-label="share">
                      <ShareRoundedIcon />
                    </IconButton>
                    &nbsp;
                  </CardActions>
                </div>
              ))}
            </Card>

            <Dialog open={openCommentModal} onClose={handleCloseCommentModal}>
              <DialogContent>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar
                        aria-label="recipe"
                        src={mypost?.userpro?.Avatar}
                      />
                    }
                    action={
                      <IconButton
                        aria-label="close"
                        onClick={handleCloseCommentModal}
                      >
                        <CloseIcon />
                      </IconButton>
                    }
                    title={mypost?.userpro?.username}
                    subheader="September 14, 2016"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {mypost?.userpro?.username} is commenting:
                    </Typography>
                    <TextField
                      label="Add a comment..."
                      multiline
                      rows={4}
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                    />
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleAddComment}
                    >
                      Submit
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={viewComment}
                    >
                      view Comments
                    </Button>
                  </CardActions>
                </Card>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="Widgets">
          <Widgets />
          <div>
            <Button onClick={() => handleEditProfileClick()}>
              {" "}
              Edit Profile{" "}
            </Button>
            <Button onClick={() => EditCoverphotoClick()}>
              Edit Cover Photo
            </Button>
          </div>
          <Button className="Logout" onClick={() => handleLogout()}>
            {" "}
            Logout{" "}
          </Button>
        </div>

        <Editprofile open={editProfileOpen} onClose={handleCloseEditProfile} />
        <Editcoverphoto open={coverphotoOpen} onClose={CloseCoverphotoClick} />
      </div>
    </>
  );
}

export default Profile;
