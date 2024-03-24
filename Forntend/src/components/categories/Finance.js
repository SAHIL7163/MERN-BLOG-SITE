import React from 'react'
import Post from '../Post';

const Finance = ({posts}) => {
   /*  const[travelposts,setTravelPosts]=useState([]); */
   const travelposts = Array.isArray(posts)
   ? posts.filter(post => {
       console.log(post.categoryId); // Log categoryId to check its value
       return post.categoryId === 2;
     })
   : [];
  console.log(travelposts); // Log the filtered posts

  return ( 
    <main className="Home d-flex flex-column justify-content-center">
      <h1 className="text-center">Finance Blogs</h1>
      {travelposts ? 
       (travelposts.map((post,index)=>(
    <Post key={post.id} post={post} postIndex={index} />
   ))
    ): <p>Loading...</p>}

    </main>
  )
}

export default Finance