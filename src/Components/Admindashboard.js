import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';

export default function Admindashboard() {
  return (
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

  //   <div>
  //   {/* <div>
  //     <Sidebar/>
  //     </div> */}

  //     <TableContainer component={Paper}>
  //     <Table sx={{ minWidth: 700 }} aria-label="customized table">
  //       <TableHead>
  //         <TableRow>
  //           <StyledTableCell>Name</StyledTableCell>
  //           <StyledTableCell align="right">Username</StyledTableCell>
  //           <StyledTableCell align="right">Email</StyledTableCell>
  //           <StyledTableCell align="right">mobile</StyledTableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         {followerlist.map((row) => (
  //           <StyledTableRow key={row._id}>
  //             <StyledTableCell component="th" scope="row">
  //               {row.name}
  //             </StyledTableCell>
  //             <StyledTableCell align="right">{row.username}</StyledTableCell>
  //             <StyledTableCell align="right">{row.email}</StyledTableCell>
  //             <StyledTableCell align="right">{row.mobile}</StyledTableCell>
  //           </StyledTableRow>
  //         ))}
  //       </TableBody>
  //     </Table>
  //   </TableContainer>
  // </div>


  );
}