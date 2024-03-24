import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useLocalStorege from '../hooks/useLocalStrorage'
import { FaUser ,FaLock,  FaEye,
    FaEyeSlash,FaUnlockAlt} from "react-icons/fa";
    import img from './../img/Screenshot (1113).png'

import axios from '../api/posts';
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth,persist ,setPersist} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useLocalStorege('user',' ');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [success, setSuccess] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            console.log(user);
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({user,pwd,accessToken,roles});
            setUser('');
            setPwd('');
            setSuccess(true);
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    const togglePersist=()=>
    {
        setPersist(prev => !prev);
    }

    useEffect(()=>
    {
    localStorage.setItem("persist",persist);
    },[persist])

    return (
        <main className="Login">
            <div className="container">
                <div className="row">
                    <div className="col-md left-div">
                        <div className="d-flex flex-column justify-content-center">
                          
                            <div className='login-left'>
                        <h2 className='text-center mt-5  '>New Here?</h2>
                        <p className='text-center fs-3'>Sign up and See amazing Blogs</p>
                        <p className='text-center fs-4'>  <span className="line text-dark">
                  <Link to="/register">Sign Up</Link>
                </span></p>
                        </div>
                        <div className="login-img d-flex justify-content-center ">
                            <img src={img} className='' alt=""/>
                            </div>
                    </div>
                    </div>
                    <div className="col-md">
        {success ? (
            <section>
                <h1>Success!</h1>
            </section>
        ) :(
        <section>

            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1 className='text-center mb-4'>Welcome back</h1>
            <form className='login-form' onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="username" className='form-label fs-4'>Username:</label>
                <div className="input-group">
          <span className="input-group-text">
            <FaUser/>
          </span>
                <input
                    type="text"
                    id="username"
                    className="form-control"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                </div>
                </div>

                <div className="mb-3">
                <label htmlFor="password" className='form-label fs-4'>Password:</label>
                <div className="input-group">
          <span className="input-group-text" >
          <FaLock/>
            </span>
                <input
                     type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="form-control"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                      <button
            className="btn bg-light text-dark"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ?  <FaEye />: <FaEyeSlash/>} 
          </button>
                </div>
               </div>
                <button className='sign-button btn-primary btn mb-3'>Sign In</button>
                <div className='persistChech'>
                    <input className='me-2'
                    type ="checkbox" 
                    id="persist"
                    onChange={togglePersist}
                    checked={persist}
                 style={{ width: '25px', height: '25px' }}
                    />
                    <label htmlFor='persist'className=''>Trust This Device</label>

                </div>
    
            </form>
        
        </section> 
        )
            }
            </div>
            </div>
            </div>
        </main>

    )
}

export default Login