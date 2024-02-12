import React, { useEffect, useState } from 'react'
import { AxiosInstance } from '../AxiosInstance';
import { useCookies } from 'react-cookie';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
  } from "@mui/material";
import { uploadCoverphoto } from '../CloudinaryCover';
import { useNavigate } from 'react-router-dom';


function Editcoverphoto({ open, onClose }) {
const navigate = useNavigate()
    const [coverPhoto,setCoverphoto] = useState();
    const [cookie] = useCookies(['cookies']);
    const [state,setState] = useState("");

    useEffect(()=>{

      if(cookie.cookies === "undefined"){
        navigate("/")
       } else{

        async function covercookie() {
          const posts = await AxiosInstance.get("/api/user/profile", {
              headers: {
                  Authorization: `bearer ${cookie.cookies}`,
              },
          })
          setState(posts.data)
       }
  
       covercookie()
    }
  
  })

  const handleupload = async () => {
    try {
       const url = await uploadCoverphoto(coverPhoto)
       await AxiosInstance.put("/api/user/editcoverphoto",
       {
        coverPhoto: url,
         id: state?.userpro?._id
       },
       {
         headers: {
            Authorization: `bearer ${cookie.cookies}`,
         },
        }
       )
    } catch (error) {
        console.log("error from upload", error.message);
    }
  }  


  const uploadcover = (e) => {
    setCoverphoto(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSave = () => {
    onClose();
  };


  return (
    <div>
      
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit Coverphoto</DialogTitle>
        
        <DialogContent component="form" onSubmit={handleSubmit}>
          <TextField type="file" onChange={(e) => uploadcover(e)} fullWidth />
          <Button onClick={handleupload}>upload</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Editcoverphoto;
