import React, { useEffect, useState } from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import { AxiosInstance } from './AxiosInstance';
import { useCookies } from 'react-cookie';

export default function Admindashboard() {

  const [totalUsers,setTotalUsers] = useState(0)
  const [cookie,setCookies] = useCookies(["cookies"])

  const fetchTotalUsers = async () => {
    try {
      const theUsers = await AxiosInstance.get("/api/admin/users",{
        headers:{
          Authorization: `bearer ${cookie.cookies}`,
        },
      }) 
        return setTotalUsers(theUsers.data.length)
      
    } catch (error) {
      console.error("Error fetching number of users", error);
      throw error;
    }
  }

  useEffect(()=>{
    fetchTotalUsers()
  },[])
 
  return (
   <div>
    <BarChart
      series={[
        { data: [3, 4, 1, 6, 5], stack: 'A', label: 'Series A1' },
        { data: [4, 3, 1, 5, 8], stack: 'A', label: 'Series A2' },
        { data: [4, 2, 5, 4, 1], stack: 'B', label: 'Series B1' },
        { data: [2, 8, 1, 3, 1], stack: 'B', label: 'Series B2' },
        { data: [10, 6, 5, 8, 9], label: 'Series C1' },
      ]}
      width={600}
      height={350}
    />
     <p> Current Total Users :<b> {totalUsers} </b></p>
  </div>

  );
}