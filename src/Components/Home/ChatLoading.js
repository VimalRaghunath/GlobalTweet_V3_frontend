import React from 'react'
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


function ChatLoading() {
  return (
    <div>
     <Box sx={{ display: 'flex' }}>
       <CircularProgress />
     </Box>
    </div>
  )
}

export default ChatLoading
