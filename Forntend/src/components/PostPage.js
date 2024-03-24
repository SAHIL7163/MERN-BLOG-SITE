import React, { useState,useEffect } from 'react'
import { useParams,Link } from 'react-router-dom'
import axios from '../api/posts'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import useAuth from '../hooks/useAuth'

const ROLES = 
{
  'User': 2001 ,
  'Editor' : 1984 ,
  'Admin' : 5150
}

const PostPage = ({posts,handleDelete}) => {
  const axiosPrivate = useAxiosPrivate();
  const{ id }=useParams(); 
  const[post ,setPost] =useState('');
  const[isLoading ,SetLoading] =useState(true);
  const[error ,setError] = useState('');
  const { auth } = useAuth();
  
  useEffect(() => {
    const fetchPost = async () => {      
      try {
        const response = await axiosPrivate.get(`/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        console.log(err);
        setError('Post Not found')
      }
      finally{
        SetLoading(false);
      }
    };

    fetchPost();
  }, [id]);
   
  const isAdmin = auth?.roles?.includes(ROLES.Admin); 
  const postBody = post.body;
  if (!postBody) {
    return null; // or some default content or message
  }
 const paragraphs = postBody.split('\n');


    return (
 <main className="PostPage">
  {isLoading && <p className='statusMsg mt-4'>Loading post...</p>}
  {error && <p className='statusMsg mt-4' style={{
    color:"red"
   }}>{error}</p>}

{!isLoading && !error && <article className=""> 
  {post && 
  <>
   <h2 className='postitle'>{post.title}</h2>
   <p className="postDate">{post.datetime}</p>

   <div className='d-flex justify-content-center'>
   <img  className="img-fluid" style ={{ 'width': '650px',display:'block' }}src={`http://localhost:3500/${post.imageUrl}`}/>
   </div>
 {/*  <p style={{ whiteSpace: 'pre-line', textIndent: '2em'}} className="my-5 postBody ps-4">{post.body}</p>  */}
   <div className='my-5'>
      {paragraphs.map((paragraph, index) => (
        <p key={index} style={{ marginTop: '0.4rem',whiteSpace: 'pre-line', textIndent: '2rem' }} className="post-Body">
          {paragraph}
        </p>
      ))}
    </div> 
<div className='d-flex justify-content-center'>
   <Link to={`/edit/${post._id}`}><button className='btn btn-lg btn-primary' type='button'>Edit Blog</button></Link>
   <button className='btn btn-lg delete-button btn-secondary' type='button' onClick={()=>handleDelete(post._id)}
   disabled={!isAdmin}>
  Delete Blog
</button>

   </div>
  </>}
  {!post &&
   <>
     <h2>Post Not Found</h2>
     <p>Well, that's disappointing.</p>
       <p>
        <Link to='/'>Visit Our Homepage</Link>
        </p>
       </>
     }
   </article>
} 
    </main>
  )
}

export default PostPage