import { useState,useEffect } from "react";


const useLocalStorege = (key,initValue) => {

    const [value ,setValue]=useState(JSON.parse(localStorage.getItem(key)) || initValue);

    useEffect(()=>
    {
     localStorage.setItem(key,JSON.stringify(value));
     console.log(value);
     console.log(initValue);
    },[key,value])

    return [value,setValue];
}

export default useLocalStorege

