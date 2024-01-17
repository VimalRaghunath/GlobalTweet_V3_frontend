import axios from "axios";

export const  uploadAvatar = async (File) => {
    const data = new FormData();
    data.append("file",File)
    console.log(File)
    data.append("upload_preset","Avatar")

    try {
        const res = await axios
        .post("https://api.cloudinary.com/v1_1/dzbk0oghc/upload", data,{
            headers:{
                "Content-Type": "multipart/form-data",
            },
        })
     if(res.status === 200) {
        console.log("upload successful:",res.data.url);
        return res.data.url;
     } else {
        console.error("upload failed.Response:",res);
        throw new Error("upload failed")
     }
    } catch (error) {

       console.error("error uploading file:", error)
        if(error.response) {
            console.error("Response data:",error.response.data)
        }
        throw error;
    }
};
