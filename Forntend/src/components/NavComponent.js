import React from 'react'
import { useState } from 'react';
import {Link } from 'react-router-dom'
import'./../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav } from 'react-bootstrap';
import {FaLaptop,FaMobileAlt, FaTabletAlt ,FaSearch} from 'react-icons/fa'
import logo from './../img/dailydoseblog-high-resolution-logo (3).jpg'
import { NavLink } from 'react-router-dom';
import useAuth from "../hooks/useAuth";
import useLogout from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';


const NavComponent = ({search,setSearch,width}) => {
  const [expanded, setExpanded] = useState(false)
  const handleNavbarToggle = () => {
    setExpanded(!expanded);
  };

  const handleNavLinkClick = () => {
    // Close the Navbar when a navigation link is clicked
    setExpanded(false);
  };

  const {auth} = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();
  const handlelogout = async () =>
  {
    await logout();
    navigate('/');
  } 
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark"  variant="dark" className="py-3 fixed-top header-nav">
    <div className="d-flex justify-content-between align-items-center w-100">
      <div>
        <Navbar.Brand className="navbar-brand-custom">
        <img src={logo} className='nav-logo'alt=""/>
        </Navbar.Brand>
      </div>
      <div className="justify-content-end">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleNavbarToggle}>
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
      </div>
    </div>
    <form className='d-flex align-items-center searchForm justify-content-center' onSubmit={(e) => e.preventDefault()}>
          <label htmlFor='search'  className='me-2 form-label'>
        {/*   <p> <FaSearch style={{ color: '#e8f0f190',height:'20px' }} /></p> */}
          </label>
          <div className="input-group">
          <span className="input-group-text" >
<FaSearch/>
            </span>
          <input 
            id="search"
            type="text"
            placeholder="Search Blogs"
            className='form-control fs-5'
            style={{paddingLeft:'0.3rem'} }
            value={search}
            autoComplete='off'
            /* style={{width:'80p'}} */
            onChange={(e) => setSearch(e.target.value)}
          />
          </div>
        </form>

  


    <Navbar.Collapse id="responsive-navbar-nav" className='navbar-custom' in={expanded}>
      <Nav className="nav-custom">
        <Nav.Link className="text-center  nav-link-custom" as={NavLink} to="/"  activeClassName="active-link" onClick={handleNavLinkClick} >
         <span className='nav-custom-span'> Home</span>
        </Nav.Link>
        <Nav.Link className="text-center nav-link-custom" as={NavLink} to="/post"  activeClassName="active-link" onClick={handleNavLinkClick}>
          <span className='nav-custom-span'>Post</span>
        </Nav.Link>
        { !auth?.accessToken ?
        <Nav.Link className="text-center nav-link-custom" as={NavLink} to="/login"   activeClassName="active-link" onClick={handleNavLinkClick}>
        <span className='nav-custom-span'>Login</span>   </Nav.Link>
         : 
        <Nav.Link className="text-center nav-link-custom" as={NavLink}  activeClassName="active-link" onClick={handlelogout}>
        <span className='nav-custom-span'>Logout</span>  </Nav.Link>  }
        <Nav.Link className="text-center nav-link-custom" as={NavLink} to="/register"  activeClassName="active-link" onClick={handleNavLinkClick}>
         <span className='nav-custom-span'> Register</span>
        </Nav.Link>
      </Nav>

              
      <h1 className="text-center">
        {width < 768 ? (
          <FaMobileAlt style={{ color: '#e8f0f190' }} />
        ) : width < 992 ? (
          <FaTabletAlt style={{ color: '#e8f0f190' }} />
        ) : (
          <FaLaptop style={{ color: '#e8f0f190' }} />
        )}
      </h1>
    </Navbar.Collapse>
</Navbar>
  )
}

export default NavComponent


{/* <>
    <h1 className="text-center">Sahil</h1>
   <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 fixed-top">
    <div className="container">
    <a href="#" class="navbar-brand">Frontend Bootcamp</a>
    <form className='searchForm' onSubmit={(e)=>e.preventDefault}>
      <label htmlFor='search'>
        Search Post
      </label>
      <input id="search"
      type="text"
      placeholder="Search Posts"
      value={search}
      onChange={(e)=>setSearch(e.target.value)}/>
    </form> 
   
    <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle ="collapse"
        data-bs-target ="#navmenu"
        >
        <span className="navbar-toggler-icon"></span>
        </button>

    <div class="collapse navbar-collapse" id="navmenu">
       <ul className="navbar-nav ms-auto">
        <li className="nav-item">< Link to="/">Home</Link> </li>
        <li className="nav-item">< Link to="post" >Post</Link> </li>
        <li className="nav-item">< Link to="Login">Login </Link> </li>
        <li className="nav-item">< Link to="Register">Register</Link> </li>
      </ul> 
      </div>

      </div>
   </nav>
   </>  */}