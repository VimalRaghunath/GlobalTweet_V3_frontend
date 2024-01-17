import React from 'react'
import "./Feed.css"
import TweetBox from './TweetsBox';
import Post from './Post'

function Feed() {
  return (
    <div className='Feed'>
     <header className='Feedheader'>
      <h2>home</h2>
     </header>
      <TweetBox/>
  
    </div>
  )
}

export default Feed
