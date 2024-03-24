import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaUser ,FaLock,  FaEye,
    FaEyeSlash,FaUnlockAlt} from "react-icons/fa";
import axios from '../api/posts';
import { Link } from "react-router-dom";
import img from'./../img/Screenshot (1110).png'

const USER_REGEX = /^[A-Z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }

       try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser('');
            setPwd('');
            setMatchPwd('');
        }catch (err) {
            if (!err?.response) {
            setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
            setErrMsg('Username Taken');
            }else {
             setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <main className="Register">
             <h1 className="text-center mb-1">Let's Join with us</h1>
             <p className="text-center mb-sm-5 fs-5">create an account to join the community</p>
           <div className="container">
            <div className="row">
                <div className="col-md register-img " > 
                    <img className="img-fluid" src={img} alt=""></img>
                </div>
                <div className="col-md">
            {success ? (
                <section className="mt-5">
                    <div className="mt-5 d-flex flex-column align-items-center justify-content-center">
                    <h1 className="">Success!</h1>
                    <p className="Register-success "> 
                    <Link to="/login"><p  className="text-dark text-center fs-3">Sign In</p></Link>
                    </p>
                    </div>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen" } aria-live="assertive">{errMsg}</p>
                   
                    <form  className="Register-form"onSubmit={handleSubmit}>
                    <div className="mb-3">
        <label htmlFor="username" className="form-label fs-4">
          Username:
          <FontAwesomeIcon icon={faCheck} className={validName ? 'valid' : 'hide'} />
          <FontAwesomeIcon icon={faTimes} className={validName || !user ? 'hide' : 'invalid'} />
        </label>
        <div className="input-group">
          <span className="input-group-text">
            <FaUser/>
          </span>
          <input
            type="text"
            id="username"
            autoComplete="off"
            className="form-control"
            placeholder="e.g. Sahil"
            ref={userRef}
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            aria-invalid={validName ? 'false' : 'true'}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          
        </div>
        <p id="uidnote" className={userFocus && user && !validName ? 'instructions' : 'offscreen'}>
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters.<br />
          Must begin with a letter.<br />
          Letters, numbers, underscores, hyphens allowed.
        </p>
      </div>


                        <div className="mb-3">
                        <label htmlFor="password" className="form-label fs-4">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <div className="input-group">
          <span className="input-group-text" >
          <FaUnlockAlt/>
            </span>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="e.g. Sahil@12"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                      
                        </div>
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
                        </div>


                        <div className="mb-3">
                        <label htmlFor="confirm_pwd" className="form-label fs-4">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        
                        <div className="input-group">
          <span className="input-group-text" >
<FaLock/>
            </span>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="form-control"
                            placeholder="e.g. Sahil@12"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <button
            className="btn bg-light text-dark"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ?  <FaEye />: <FaEyeSlash/>} 
          </button>
                        </div>
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>
                        </div>

                        <button
        className={`btn btn-primary ${!validName || !validPwd || !validMatch ? 'disabled' : ''}`}
        type="submit"
        disabled={!validName || !validPwd || !validMatch}
      >
            Sign Up
      </button>
                    </form>
                    <p className="fs-4">
                        Already registered?

                          <spn className="line ">
                            {/*put router link here*/}
                            <Link to="/login"><p className="" > Sign In</p></Link>
                            </spn>
                    </p>
                </section>
            )}
            </div>
            </div>
            </div>
        </main>
    )
}

export default Register