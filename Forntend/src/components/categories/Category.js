import React from 'react'
import { Link } from 'react-router-dom'

const Category = () => {
  return (<>
          <h1 className='mb-3 text-center category-h1'>Most Popular Categories</h1>
    <div className='category-container'>
        <div className="category category-1" >
            
             <div className="category-content">
             <Link to={`/travel`}><button>Travel Blogs</button></Link>
            </div>
            </div>
        <div className="category category-2">
        <Link to={`/tech`}> <button>Tech Blogs</button></Link>
        </div>
        <div className="category category-3">
        <Link to={`/finance`}> <button>Finance Blogs</button></Link>
        </div>
    </div>
    </>
  )
}

export default Category