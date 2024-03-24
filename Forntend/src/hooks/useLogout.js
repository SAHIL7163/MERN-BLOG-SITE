import axios from '../api/posts';
import useAuth from './useAuth';

const useLogout = () => {
    const {setAuth} = useAuth();

    const logout = async () =>
    {
        setAuth({});

        try{
            const response = await axios('/logout' ,
            {
                withCredentials : true 
        });
        console.log(true);
    }
    catch(err)
    {
        console.log(err);
    }
    }
    return logout;
}

export default useLogout