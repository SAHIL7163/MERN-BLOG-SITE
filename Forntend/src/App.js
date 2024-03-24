import Layout from './components/Layout';
import Home from './components/Home';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import About from './components/About';
import Missing from './components/Missing';
import {format} from 'date-fns';
//import api from './api/posts';
import axios from './api/posts'
import Register from './components/Register';
import Login from './components/Login';

import Travel from './components/categories/Travel'
import Tech from './components/categories/Tech';
import Finance from './components/categories/Finance';

import { Route,Routes ,useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import Editpost from './components/Editpost';
import useWindowsize from './hooks/useWindowsize';
import useAxiosFetch from './hooks/useAxiosFetch';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import useAxiosPrivate from './hooks/useAxiosPrivate';
import FormData from 'form-data';


const POSTS_URL = './posts'

const ROLES = 
{
  'User': 2001 ,
  'Editor' : 1984 ,
  'Admin' : 5150
}


//import set from 'date-fns/esm/set';
function App() {
  
  const[posts,setPosts]=useState([]);
  const [search,setSearch]=useState('');
  const [searchResults,setSearchResults]=useState('');
  const [posttitle,setPosttitle]=useState('');
  const[postBody,setPostBody]=useState('');
  const [categoryId, SetcategoryId] = useState('')
  const[image,setImage] = useState('');
  const[edittitle,setedittitle]=useState('');
  const[editpostbody,seteditpostbody]=useState('');
  const navigate=useNavigate();
  const {width}=useWindowsize();
  const[fetchError ,setfetchError] = useState(false);
  const[isLoading , SetLoading] = useState(true);
 // const {data,fetchError,isLoading}=useAxiosFetch('http://localhost:3500/posts');

  const axiosPrivate = useAxiosPrivate();
   
  
 /*  useEffect(()=>
  {
    setPosts(data);
  },[data])
 */

   useEffect(()=>
  {
    const fetchPosts= async()=>
    { 
      try{
          const response= await axios.get('/posts');
          if(response && response.data)   setPosts((response.data));

      }catch(error){
        if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        }
        else
        {
          console.log(`Error: ${error.message}`);
        }
      //  setfetchError(error);
      }
      finally{
        SetLoading(false);
      }
    }
    fetchPosts();
  },[]) 

 posts.sort((a, b) => a.datetime.localeCompare(b.datetime)); 

 useEffect(()=>
 {
   const filteredResults=posts.filter((post)=>
   ((post.body).toLowerCase()).includes(search.toLowerCase())
   ||  ((post.title).toLowerCase()).includes(search.toLowerCase())
   ||((post.datetime).includes(search)));
   setSearchResults(filteredResults.reverse());
 },[posts,search])
 
  const handleSubmit=async(e)=>
  {  
   e.preventDefault();
     //const id=posts.length ? posts[posts.length-1].id+1 : 1;
     const datetime =format(new Date(),'MMMM dd,yyyy pp');
     const newpost={title:posttitle,datetime ,body:postBody};
     console.log(image);

   const formData = new FormData();
formData.append('title', posttitle);
formData.append('datetime', datetime);
formData.append('body', postBody);
formData.append('image', image);
formData.append('categoryId',categoryId)

console.log(formData);
formData.forEach((value, key) => {
  console.log(key, value);
});

      try{
      const response=await axiosPrivate.post('/posts',formData)
      //JSON.stringify({title:posttitle,datetime,body:postBody}),{image}); 
      console.log(JSON.stringify(response?.data));
     const allPosts=[...posts ,response.data];
     setPosts(allPosts.sort((a, b) => b.datetime - a.datetime));
     setPosttitle('');
     setPostBody('');
    navigate('/');
     }
     catch(err){
       console.log(`Error :${err.message}`);
     } 
  }

  const handleEdit =async (id)=>
  {
    const datetime =format(new Date(),'MMMM dd,yyyy pp');
    const updatedPost={title:edittitle,datetime ,body:editpostbody};
    const formData = new FormData();
    formData.append('title', edittitle);
    formData.append('datetime', datetime);
    formData.append('body', editpostbody);
    formData.append('image', image);
    formData.append('categoryId',categoryId)
     

    //console.log(formData);
formData.forEach((value, key) => {
  console.log(key, value);
});


    try{
   const response=await axiosPrivate.put(`/posts/${id}`,formData)
   // JSON.stringify({title:edittitle,datetime,body:editpostbody}));
    const nonsortposts = posts.map(post=> post._id===id ?{...response.data}:post);
   setPosts(nonsortposts.sort((a, b) => b.datetime - a.datetime));
    setedittitle('');
    seteditpostbody('');
   navigate('/');
    }
      catch(err){
        console.log(`Error :${err.message}`);
    }
  }


  const handleDelete=async(id)=>
   {
    try{
      const response=await axiosPrivate.delete(`/posts/${id}`) 
       const  NewPosts = posts.filter((post)=>(post._id)!==id);
    setPosts(NewPosts); 
   navigate('/');
   window.scrollTo(0, 0);
   }
   catch(err){
    console.log(err);
   }
   }

   /* posts.sort((a, b) => a.datetime.localeCompare(b.datetime)); */
  
  return (
    <Routes>
      <Route path="/"  element={<Layout 
       search={search} 
       setSearch={setSearch}
       width={width}/>}>
      <Route index element={<Home posts={searchResults}  
        fetchError={fetchError}
        isLoading={isLoading}/>  }/>

      
      <Route element ={<PersistLogin/>}>
      <Route path="post"> 
      <Route element ={<RequireAuth allowedRoles={[ROLES.Admin]}/>} >
        <Route index element={
        <NewPost 
        handleSubmit={handleSubmit}
        posttitle={posttitle}
        setPosttitle={setPosttitle}
        postBody={postBody}
        setPostBody={setPostBody}
        image ={image} 
        setImage ={setImage}
        categoryId={categoryId}
        SetcategoryId={SetcategoryId}
        /> } />
        </Route>
             
     
          <Route element ={<RequireAuth allowedRoles={[ROLES.Admin ,ROLES.User,ROLES.Editor]}/> } >
         <Route path=":id" element={
           <PostPage posts={posts} handleDelete={handleDelete}/> 
          } />
          </Route>
         </Route>
         </Route>
       
       <Route element={<PersistLogin />}>
      <Route path= "edit">
      <Route element={<RequireAuth  allowedRoles={[ROLES.Editor,ROLES.Admin]}/>} >
        <Route path=":id" element={
      <Editpost 
        posts={posts}
        handleEdit={handleEdit}
        edittitle={edittitle}
        setedittitle={setedittitle}
        editpostbody={editpostbody}
        seteditpostbody={seteditpostbody}
        image ={image} 
        setImage ={setImage}
        categoryId={categoryId}
        SetcategoryId={SetcategoryId}
        /> } /> 
        </Route > 
        </Route>
        </Route>

        <Route path="Register" >
          <Route index element ={ <Register /> } />
        </Route>
        <Route path="Login" >
          <Route index element ={ <Login /> } />
        </Route>

        <Route path="travel">
          <Route index element={<Travel  posts={searchResults} />} />
        </Route>
        <Route path="tech">
          <Route index element={<Tech posts={searchResults} />} />
        </Route>
        <Route path="finance">
          <Route index element={<Finance posts={searchResults} />} />
        </Route>

        <Route path="unauthorized" element={<Unauthorized />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Missing />} /> 
      </Route>
    </Routes>
  );
}

export default App;
