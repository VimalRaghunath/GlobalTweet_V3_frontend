import React from 'react';
import "./NewPost.css"
import TweetBox from './Feed/TweetsBox';
import Sidebar from './Sidebar/Sidebar';



function NewPost() {
  

 
  return (
    <div className='Newpost'>
        
      <Sidebar/>
       <TweetBox/>
      

    </div>

  );
}


export default NewPost;