import React from 'react'
import Feed from './Feed'
import useLogout from '../hooks/useLogout'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Category from './categories/Category'


const Home = ({posts,fetchError,isLoading}) => {
  return (
   <main className="Home d-flex flex-column justify-content-center">
  <Category/>
{/*     <div className='carousel-img'><Carouseles/></div> */}
   {isLoading && <p className='statusMsg'>Loading posts...</p>}
   {fetchError && <p className='statusMsg' style={{
    color:"red"
   }}>{fetchError}</p>}
   {!isLoading && !fetchError && (posts.length?( 
      <Feed posts={posts}/>
    ): (
      <p  className='statusMsg' style={{marginTop:"2rem"}}>No Posts to Display</p>
    )
  )} 
   </main>
  )
}

export default Home