import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { AxiosInstance } from './Components/AxiosInstance'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar } from '@mui/material';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function Adminusers() {

    const [usersList,setUsersList] = useState([])
    const [cookie,setCookie] = useCookies(["cookies"])


    const allUsers = async () => {
        try {
            const alltheUsers = await AxiosInstance.get("/api/admin/users", {

                headers: {
                   Authorization: `bearer ${cookie.cookies}`,
                },
             }
          );
           return setUsersList(alltheUsers.data)
        } catch (error) {

          console.error("Error fetching all the users:", error);
          throw error;
        }
    }

    useEffect(() => {
      allUsers();
    }, []); 


  return (
    <div style={{display:"flex",justifyContent:"center"}}>
      <div>
      <TableContainer component={Paper} >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Username</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Mobile</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          usersList.map((item) => (
            <StyledTableRow key={item._id}>
              <StyledTableCell component="th" scope="row">
                <Avatar src={item.Avatar}/>
                {item.name}
              </StyledTableCell>
              <StyledTableCell align="right">{item.username}</StyledTableCell>
              <StyledTableCell align="right">{item.email}</StyledTableCell>
              <StyledTableCell align="right">{item.mobile}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
       
      </div>
    </div>
  )
}

export default Adminusers





 

