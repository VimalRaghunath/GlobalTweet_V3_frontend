import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
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
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AxiosInstance } from "../../AxiosInstance";
import { useNavigate } from "react-router-dom";

function Post({ userId }) {
  const [post, setPost] = useState([]);
  const [liking, setLiking] = useState(false);
  const [commenting, setCommenting] = useState([]);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    async function getall() {
      const posts = await AxiosInstance.get("/api/user/post");
      setPost(posts.data);
    }
    getall();
  }, [liking, commenting]);

  const handleLike = async (postId) => {
    try {
      const like = await AxiosInstance.post("/api/user/like/", {
        userId,
        postId: postId,
      });

      setLiking(!liking);
    } catch (error) {
      console.error(error);
    }
  };

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
        userId,
        postId: selectedPostId,
        text: commentInput,
      });
      handleCloseCommentModal();
    } catch (error) {
      console.error(error);
    }
  };
  const navigate = useNavigate();

const viewComment=()=>{
  const postId= selectedPostId;
  navigate(`/comments/${postId}`)
}

  return (
    <div>
      <h2> posts </h2>

      {post.data?.map((postItem, index) => (
        <div key={index}>
          <Card sx={{ maxWidth: 545, marginBottom: "2rem" }}>
            <div>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" src={postItem?.userId?.Avatar} />
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={postItem?.userId?.name}
                subheader="September 14, 2016"
              />

              {postItem?.image ? (
                <CardMedia
                  component="img"
                  image={postItem?.image}
                  alt="Paella dish"
                />
              ) : null}
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {postItem?.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => handleLike(postItem._id)}
                >
                  <FavoriteIcon />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                  {postItem?.likes?.length}
                </Typography>
                <IconButton
                  aria-label="comment"
                  onClick={() => handleComment(postItem._id)}
                >
                  <ChatBubbleOutlineRoundedIcon />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                  {postItem?.comments.length}
                </Typography>

                <IconButton aria-label="retweet">
                  <RepeatRoundedIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareRoundedIcon />
                </IconButton>
              </CardActions>
            </div>

            {/* Comment Modal */}
            <Dialog open={openCommentModal} onClose={handleCloseCommentModal}>
              <DialogContent>
                <Card>
                  <CardHeader
                    action={
                      <IconButton
                        aria-label="close"
                        onClick={handleCloseCommentModal}
                      >
                        <CloseIcon />
                      </IconButton>
                    }
                  />
                  <CardContent>
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
          </Card>
        </div>
      ))}
    </div>
  );
}

export default Post;
