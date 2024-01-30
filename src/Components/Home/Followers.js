import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar/Sidebar'
import { useCookies } from 'react-cookie'
import { AxiosInstance } from '../AxiosInstance'


function Followers() {

  const [cookie,setCookie] = useCookies(["cookies"])
  const [followerlist,setFollowerlist] = useState([])

  const user=JSON.parse(localStorage.getItem("user"))
  const userId=user?._id
  // console.log(userId);

  const followerss = async () => {
    try {
      const lists = await AxiosInstance.get(`/api/user/followers/${userId}`, {
        headers: {
          Authorization: `bearer ${cookie.cookies}`,
        },
      });
      setFollowerlist(lists.data.followers);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    followerss()
  }, []); 

console.log(followerlist,"l")
  return (
    <div>
      <Sidebar/>
      <div>
        {
          followerlist.map((item)=>(
            <div key={item._id}>
              <p>{item.name}</p>

            </div>


          ))
        }

      </div>

     
    </div>
  )
}

export default Followers
