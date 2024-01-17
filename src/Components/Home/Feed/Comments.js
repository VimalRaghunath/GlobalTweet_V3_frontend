import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  CardActions,
  TextField,
  Button,
} from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useParams } from "react-router-dom";
import { AxiosInstance } from "../../AxiosInstance";
import moment from "moment"; 

const Comments = () => {
  const { postId } = useParams();
  // const [cookie, ] = useCookies(["cookies"]);
  const [postById, setPostById] = useState([]);
  const [username, setUserName] = useState(null);
  const [avatar,setAvatar]=useState(null);

  const fetchPost = async () => {
    try {
      const post = await AxiosInstance.get(`/api/user/getcomment/${postId}`);
      const data = post.data.data;
      setPostById(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    fetchPost();
  },[])

  
  
  useEffect(() => {
   
    if (postById.comments?.length > 0) {
      const user = postById.comments[0];
      setUserName(user?.userId?.username);
      setAvatar(user?.userId?.Avatar);
    }
  }, [postById.comments]);


  console.log(postById.comments);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <Sidebar />
      </div>

      <Card sx={{ maxWidth: 545 }}>
        <div>
     
          <CardHeader
            avatar={<Avatar aria-label="recipe" src={avatar} />}
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={username}
            subheader="September 14, 2016"
          />
    
        {postById?.image ? <CardMedia component="img" image={postById?.image} alt="Paella dish" /> : null}
          <CardContent>
            <Typography variant="body2" color="text.secondary"></Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <Typography variant="body2" color="text.secondary"></Typography>
            <IconButton aria-label="comment">
              <ChatBubbleOutlineRoundedIcon />
            </IconButton>

            <IconButton aria-label="retweet">
              <RepeatRoundedIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareRoundedIcon />
            </IconButton>
          </CardActions>
        </div>
        <div style={{ display: "flex", padding: "10px" }}>
          <TextField fullWidth label="...comment" id="fullWidth" />
          <Button>submit</Button>
        </div>
        <div>
        {postById.comments?.map((comments)=>(
          <Card style={{ backgroundColor: "white-grey", margin: "10px" ,borderRadius:"2rem"}}>
          <CardHeader
            avatar={<Avatar aria-label="recipe" src={comments?.userId?.Avatar} />}
            
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={comments?.userId?.username}
            subheader={moment(comments.createdAt).fromNow()}
          />
          <div style={{marginLeft:"2rem"}}>
            <h2 >{comments.text}</h2>
            </div>
          </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Comments;
