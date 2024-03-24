import React from 'react'
import NavComponent from './NavComponent';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = ({search ,setSearch,width}) => {
  return (
    <div className="App">
    <NavComponent search={search} setSearch={setSearch} width={width}/>
     <Outlet/>
    <Footer/>
    </div>
  )
}

export default Layout