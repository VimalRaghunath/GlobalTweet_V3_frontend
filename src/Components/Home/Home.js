import React, {} from 'react'
import Sidebar from "./Sidebar/Sidebar"
import Feed from "./Feed/Feed"
import "./Home.css"
import Widgets from './Widgets/Widgets'


function Home() {

  return (
  
    <div className='home'>
      <Sidebar/>
      <Feed/>
      <Widgets/>
    </div>

  )
}

export default Home
