import React, { useEffect, useState } from "react";
import { AxiosInstance } from "./Components/AxiosInstance";
import { useCookies } from "react-cookie";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Adminposts() {
  const [cookie, setCookie] = useCookies(["cookies"]);
  const [expanded, setExpanded] = useState(false);
  const [allPosts,setAllPosts] = useState([])

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  const getAllposts = async () => {
    try {
      const fetchAlldata = await AxiosInstance.get("/api/admin/posts",{
        headers : {
          Authorization: `bearer ${cookie.cookies}`
        },
     })
     return setAllPosts(fetchAlldata.data.data)
      
    } catch (error) {
      console.error("error fetching all the users:", error)
      throw error;
    }
  }

  useEffect(()=>{
    getAllposts();
  }, [])



  return (
    <div>
      <h3 style={{display:"flex",justifyContent:"center"}} >All Posts</h3>
    <div style={{display:"flex",gap:"10px"}} >
      {allPosts.map((useritem,index) => (
        <div key={index}>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar
                  src= {useritem?.userId?.Avatar}
                  sx={{ bgcolor: red[500] }}
                  aria-label="recipe"
                >
                 
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={useritem.userId.name}
              subheader="September 14, 2016"
            />
              <div >
                <CardMedia
                  component="img"
                  height="194"
                  image={useritem.image}
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {useritem.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    {useritem.likes.length}
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton
                    aria-label="comment">
                    <ChatBubbleOutlineRoundedIcon />
                    {useritem.comments.length}
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
              </div>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Method:</Typography>
                <Typography paragraph>
                  Heat 1/2 cup of the broth in a pot until simmering, add
                  saffron and set aside for 10 minutes.
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </div>
      ))}
    </div>
    </div>
  );
}

export default Adminposts;
