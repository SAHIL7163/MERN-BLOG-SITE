import React from 'react'
import {FaLaptop,FaMobileAlt, FaTabletAlt } from 'react-icons/fa' 
import useLogout from '../hooks/useLogout'
import { useNavigate } from 'react-router-dom'

const Header = ({title,width}) => {
  return (
   <header className="Header">
    <h1>
        {title}
    </h1>
    {width<768 ? <FaMobileAlt style={{ color: 'white' }} /> 
    : width<992 ?<FaTabletAlt style={{ color: 'white' }}/>
     :<FaLaptop style={{ color: 'white' }}/>}
   </header>
  )
}

export default Header