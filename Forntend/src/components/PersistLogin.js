import {Outlet} from "react-router-dom"
import { useEffect, useState} from "react"
import useRefreshToken from "../hooks/useRefreshToken"
import useAuth from "../hooks/useAuth"

const PersistLogin =()=>
{
    const [isLoading , setisLoading] =useState(true);
    const refresh = useRefreshToken();
    const {auth,persist}=useAuth();


    useEffect(()=>
    {
    const verifyRefreshToken = async ()=>
    {

      try{
        await refresh();
      }
     catch(err)
     {
      console.log(err);
     }
     finally{
        setisLoading(false);
     }
    }

      !auth?.accessToken  && persist ?  verifyRefreshToken() : setisLoading(false);

    },[])


    useEffect(()=>
    {
         console.log(`isLoading : ${isLoading}`)
         console.log(`aT : ${JSON.stringify(auth?.accessToken)}`)
    },[isLoading])


    return (
      <>
      {!persist 
      ? <Outlet />
      : isLoading
       ? <p>Loading...</p>  
       : <Outlet/>
      }
      </>
    )
}

export default PersistLogin