import React from 'react'


const Footer = ({fetchError}) => {
  const today = new Date();
  
  return (
    <>
     <p style={{color:'white'}}>{fetchError}</p>
    <footer className='Footer bg-dark text-light'>
         <p>Copyright &copy; {today.getFullYear()}</p>
   </footer>
   </>
  )
}

export default Footer