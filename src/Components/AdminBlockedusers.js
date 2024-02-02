import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { AxiosInstance } from './AxiosInstance'

function AdminBlockedusers() {

 const [blocked,setBlocked] = useState([])
 const [cookie,setCookie] = useCookies(["cookies"])

 const AllblockedUsers = async () => {
    try {
        const blockedUsers = await AxiosInstance.get("/api/admin/blockedusers", {
          headers: {
            Authorization: `bearer ${cookie.cookies}`
          }
        })
           return setBlocked(blockedUsers.data.isBlocked)
    } catch (error) {
        console.error("error fetching blocked users:", error);
        throw error;
    }
 }
   useEffect(()=>{
    AllblockedUsers();
   },[])

  return (
    <div>
      
    </div>
  )
}

export default AdminBlockedusers
