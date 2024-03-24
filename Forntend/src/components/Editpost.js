import React from 'react'
import { useEffect } from 'react';
import { Link,useParams } from 'react-router-dom';
import { useState } from 'react';
const Editpost = (
{posts, edittitle,setedittitle,editpostbody,seteditpostbody,handleEdit,image,setImage,categoryId,SetcategoryId }
) => {
    const {id} =useParams();
    const post=posts.find((post)=> (post._id)===id);
    const [filename, setFilename] = useState('');
    const categories =['Travel','Tech','Finance','Fashion','Food','PesonalBlog','Sports'];
    const usersOptions = categories.map((category,index) => (
      <option key={index+1} value={index}>
          {category}
      </option>

  )) 
    useEffect(()=>
    {
        if(post)
        {   setedittitle(post.title);
            seteditpostbody(post.body);
           setFilename(post.filename);
           setImage(post.filename);
           SetcategoryId(post.categoryId);
           console.log(post);
        }
    },[post,seteditpostbody,setedittitle])

    const handleFileChange = (e) => {
            const selectedFile = e.target.files[0];
      setImage(selectedFile);
      setFilename(selectedFile ? selectedFile.name : '');
    };

    
  const onCategorychanged = e => SetcategoryId(e.target.value)

  return (
    <main className="NewPost">
        {(edittitle || editpostbody || image )  && 
        <>
    <h2 className='text-center NewsPost-h1 text-dark'>Edit Blog</h2>
    <form className="newPostForm" onSubmit={(e)=>e.preventDefault()}>
    
    <div className="mb-3">
      <label htmlFor='postTitle' className='form-label h5'>Title:</label>
      <input
      id="postTitle"
      className='form-control'
      type="text"
      required
      value={edittitle}
      onChange={(e)=>setedittitle(e.target.value)}
      ></input>
      </div>

      <div className="mb-3">
       <label htmlFor='postBody' className='form-label h5'>Post:</label>
      <textarea
      id="postBody"
      className='form-control'
      required
      value={editpostbody}
      onChange={(e)=>seteditpostbody(e.target.value)}
      ></textarea>
      </div>

      <label htmlFor="category" className='form-label text-dark fs-5'>Category:</label>
                <select id="category" value={categoryId} onChange={onCategorychanged} className='fs-5' style={{height:'2rem'}}>
                    <option value="">
                    {categories[categoryId]}
                    </option>
                     {usersOptions
          .filter((option) => option.props.value !== post.categoryId) // Exclude the selected category
          .map((filteredOption) => (
            <option key={filteredOption.props.value} value={filteredOption.props.value}>
              {filteredOption.props.children}
            </option>
          ))} 
                    
                </select>
      {/* <input onChange={(e)=>setImage(e.target.files[0])} type="file"/>  */}
      <label htmlFor="fileInput"  style={{ border: '2px solid black', display: 'inline', marginBottom: '8px' ,textAlign:'center'}} ><h5>Choose A File</h5></label>
              <input
              id="fileInput"
              type="file"
              className='form-control'
              onChange={handleFileChange}
              style={{ display: 'none' }} // Hide the default file input
  
            />
            <div>
              {filename ? (
                <p className='text-center text-dark'>  <span className='h6'>Selected File</span>: {filename}</p>
              ) : (
                <p className='text-center text-dark h6 mb-3'>No file chosen</p>
              )}
              </div> 
            

      <button type='submit' onClick={(e)=>handleEdit(post._id)}>
       Submit
      </button>
    </form>
    </>
}
{!post && 
   <>
     <h2>Post Not Found</h2>
     <p>Well, that's disappointing.</p>
       <p>
        <Link to='/'>Visit Our Homepage</Link>
        </p>
       </>
     }
   </main>

  )
}

export default Editpost