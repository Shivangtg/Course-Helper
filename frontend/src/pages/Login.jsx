import { useState } from 'react'
import { useThemeContext } from '../hooks/useThemeContext'
import { useUserContext } from '../hooks/useUserContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email,set_email]=useState('');
  const [password,set_password]=useState('');
  const [error,setError]=useState("");

  //styling purposes only
  const {theme}=useThemeContext()
  const bgColor=(theme=="dark"?"black":"white")
  const textColor= (theme=="dark"?"white":"black")
  document.getElementsByTagName('body')[0].style.backgroundColor=bgColor;
  document.getElementsByTagName('body')[0].style.color=textColor
  document.getElementsByTagName('body')[0].style.transition="0.5s"
  const formBorder=(theme=="dark"?"2px solid yellow":"2px solid white")
  const formShadow=(theme=="dark"?"0 0 10px yellow":"0 0 10px #eb00ff")

  

  //Setting User Context
  const {setUserState}=useUserContext()
  const navigate=useNavigate()

  const handleSubmit=async function(e){
    e.preventDefault();
    setError("");
    
    const response=await fetch("https://course-helper-backend.onrender.com/api/user/login",{
        method:"POST",
        body:JSON.stringify({email,password}),
        headers:{
            "Content-Type":"application/json"
        }
    });
    const json=await response.json();
    if(response.ok){
        setError("");
        setUserState({type:"LOGIN",payload:json});
        localStorage.setItem("user",JSON.stringify(json))
        console.log("User Logged in");
        
        navigate("/");
        return ;
    }
    setError(json.error)
    // console.log("error in loging in user",json.error)
  }


  return (
    <div className='adding-course-container' style={{border:formBorder,boxShadow:`${formShadow}`}}>
    <form onSubmit={handleSubmit}>

        <h2>Login</h2>
        <label>Email:</label>
        <input type="email" name='email' value={email} onChange={(e)=>{set_email(e.currentTarget.value)}}/>

        <label>Password:</label>
        <input type="password" name='password' value={password} onChange={(e)=>{set_password(e.currentTarget.value)}}/>
        <div className='bottom-line'>
        <button>Login</button>
        <div>
          <Link style={{color:textColor,textDecoration:`underline ${textColor}`}} to="/signup">New User?</Link>
          <Link style={{color:textColor,textDecoration:`underline ${textColor}`}} to="/forgotPassword">forgot password</Link>
        </div>
        </div>
    </form>
      {error!=""?<div className='error'>{error}</div>:[""]}
    </div>
  )
}

export default Login