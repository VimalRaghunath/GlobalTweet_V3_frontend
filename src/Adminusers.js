import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { AxiosInstance } from './Components/AxiosInstance'

function Adminusers() {

    const [usersList,setUsersList] = useState()
    const [cookie,setCookie] = useCookies(["cookies"])

    const allUsers = async () => {
        try {
            const alltheUsers = await AxiosInstance.get("/api/admin/users", {

                headers: {
                   Authorization: `bearer ${cookie.cookies}`,
                },
             }
          );
           return setUsersList(alltheUsers.data._id)
        } catch (error) {

          console.error("Error fetching all the users:", error);
          throw error;
        }
    }


  return (
    <div>
      <div>
        
      </div>
    </div>
  )
}

export default Adminusers




//     <div>
      
//     <div>
//      <div> 
//       <Sidebar/>
//       </div> 

//   //     <TableContainer component={Paper}>
//   //     <Table sx={{ minWidth: 700 }} aria-label="customized table">
//   //       <TableHead>
//   //         <TableRow>
//   //           <StyledTableCell>Name</StyledTableCell>
//   //           <StyledTableCell align="right">Username</StyledTableCell>
//   //           <StyledTableCell align="right">Email</StyledTableCell>
//   //           <StyledTableCell align="right">mobile</StyledTableCell>
//   //         </TableRow>
//   //       </TableHead>
//   //       <TableBody>
//   //         {followerlist.map((row) => (
//             <StyledTableRow key={row._id}>
//               <StyledTableCell component="th" scope="row">
//                 {row.name}
//               </StyledTableCell>
//               <StyledTableCell align="right">{row.username}</StyledTableCell>
//               <StyledTableCell align="right">{row.email}</StyledTableCell>
//               <StyledTableCell align="right">{row.mobile}</StyledTableCell>
//             </StyledTableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   </div>
//     </div>
 

