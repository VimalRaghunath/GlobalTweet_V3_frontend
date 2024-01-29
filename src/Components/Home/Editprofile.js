import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { AxiosInstance } from "../AxiosInstance";
import { useCookies } from "react-cookie";
import { uploadAvatar } from "../CloudinaryAvatar";

function Editprofile({ open, onClose }) {
  
  const [avatar, setAvatar] = useState();
  const [cookie, , ] = useCookies(["cookies"]);
  const [state, setState] = useState("");

  

  useEffect(() => {
    async function newcookie() {
      const posts = await AxiosInstance.get("/api/user/profile", {
        headers: {
          Authorization: `bearer ${cookie.cookies}`,
        },
      });
      setState(posts.data);
     
    }
    newcookie()},)



  const handleupload = async () => {
    try {
      const url = await uploadAvatar(avatar);
      await AxiosInstance.put(
        "/api/user/editavatar",
        {
          avatar:url,
          id:state?.userpro?._id
        },
        {
          headers: {
            Authorization: `bearer ${cookie.cookies}`,
          },
        }
      );
    } catch (error) {
      console.log("error from upload", error.message);
    }
  };

  const UploadAvatar = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSave = () => {
    onClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        
        <DialogContent component="form" onSubmit={handleSubmit}>
          <TextField type="file" onChange={(e) => UploadAvatar(e)} fullWidth />
          <Button onClick={()=>handleupload()}>upload</Button>
        </DialogContent>
        <DialogContent>
          <TextField label="Name" fullWidth defaultValue={""} />
          <TextField label="Username" fullWidth defaultValue={""} />
          <TextField
            label="Bio"
            fullWidth
            multiline
            rows={3}
            defaultValue={""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>onClose()}>Cancel</Button>
          <Button onClick={()=>handleSave()}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Editprofile;


