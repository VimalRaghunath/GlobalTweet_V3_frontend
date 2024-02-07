import React from 'react'
import Box from '@mui/material/Box';
import ChatLoading from "./ChatLoading";
import { Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


function ChatLoading() {
  return (
    <div>
    <Stack>
      <CircularProgress />
    </Stack>
    </div>
  )
}

export default ChatLoading
