import React from 'react'
import { useState } from 'react';


const NewPost = ({
  handleSubmit,posttitle, setPosttitle,postBody,setPostBody,image,setImage,categoryId,SetcategoryId
}) => {

  const categories =['Travel','Tech','Finance','Fashion','Food','PesonalBlog','Sports'];
  const usersOptions = categories.map((category,index) => (
    <option key={index+1} value={index}>
        {category}
    </option>
)) 
  const [filename, setFilename] = useState('');
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    console.log(image);
    setFilename(selectedFile ? selectedFile.name : '');
  };

  const onCategorychanged = e => SetcategoryId(e.target.value);

  return (
   <main className="NewPost">
    <h1 className='text-center NewsPost-h1 text-black'>New Blog</h1>
    <form className="newPostForm " onSubmit={handleSubmit}>
      
      <div className="mb-3">
      <label htmlFor='postTitle' className='form-label text-black'>
        <h5>Title:</h5>
        </label>
      <input
      id="postTitle"
      type="text"
      className='form-control focus-outline-black'
      required
      autoComplete='off'
      value={posttitle}
      onChange={(e)=>setPosttitle(e.target.value)}
      ></input>
            </div>

            <div className="mb-3">
       <label htmlFor='postBody' className='form-label text-black'>
        <h5>Post:</h5></label>
      <textarea
      id="postBody"
      className='form-control focus-outline-black'
      required
      autoComplete='off'
      value={postBody}
      onChange={(e)=>setPostBody(e.target.value)}
      ></textarea>
      </div>


      <label htmlFor="category" className='form-label text-dark fs-5'>Category:</label>
                <select id="category" value={categoryId} onChange={onCategorychanged} className='fs-5' style={{height:'2rem'}}>
                    <option value=""></option>
                    {usersOptions}
                </select>

        <label htmlFor="fileInput" className='form-label form-control text-dark fs-5' style={{ border: '2px solid black', display: 'inline', marginBottom: '8px' ,textAlign:'center',background:'white'}} >Choose A File</label>
              <input
              id="fileInput"
              type="file"
              required
              className='form-control focus-outline-black'
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
      <button type='submit' className='btn btn-primary'>
       <h4>Submit</h4>
      </button>

    </form>
   </main>
  )
}

export default NewPost