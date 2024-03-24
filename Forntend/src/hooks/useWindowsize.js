import { useEffect,useState } from "react";

const useWindowsize =()=>
{
  const [windowSize,setwindowSize]=useState(
    {
        width:undefined,
        height:undefined
    })

    useEffect(()=>
    {
      const handleresize=()=>
      {
        setwindowSize({
            width:window.innerWidth,
            height:window.innerHeight
        });
      }

      handleresize();
      
      window.addEventListener("resize",handleresize);


     return  ()=>window.removeEventListener("resize",handleresize);
    },[])

    return windowSize;

}
export default useWindowsize;