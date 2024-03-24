import React from 'react'
import Post from './Post'
const Feed = ({posts}) => {
  const mixedposts = posts.filter(post => post.categoryId === 0);
  
  return (
   <main className="Feed">
   {posts.map((post,index)=>(
    <Post key={post.id} post={post} postIndex={index} />
   ))
   }
    </main>
  )
}

export default Feed