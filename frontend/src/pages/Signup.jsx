import  { useState } from 'react'
import { useThemeContext } from '../hooks/useThemeContext'
import { useUserContext } from '../hooks/useUserContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email,set_email]=useState('');
  const [password,set_password]=useState('');
  const [name,set_name]=useState('');
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
    try {
      const response=await fetch("https://course-helper-backend.onrender.com/api/user/signup",{
        method:"POST",
        body:JSON.stringify({email,password,username:name}),
        headers:{
            "Content-Type":"application/json"
        }
      });
      const json=await response.json();
      if(response.ok){
          setError("");
          setUserState({type:"LOGIN",payload:json});
          localStorage.setItem("user",JSON.stringify(json));
          // console.log("new user stored");
          
          navigate("/")
          return ;
      }
      setError(json.error)
    } catch (error) {
      console.log(error)
    }
    
    // console.log("error in loging in user",json.error)
  }


  return (
    <div className='adding-course-container' style={{border:formBorder,boxShadow:`${formShadow}`}}>
    <form onSubmit={handleSubmit}>

        <h2>Signup</h2>
        <label>Name:</label>
        <input type="text" name='name' value={name} onChange={(e)=>{set_name(e.currentTarget.value)}}/>

        <label>Email:</label>
        <input type="email" name='email' value={email} onChange={(e)=>{set_email(e.currentTarget.value)}}/>

        <label>Password:</label>
        <input type="password" name='password' value={password} onChange={(e)=>{set_password(e.currentTarget.value)}}/>
        
        <div className='bottom-line'>
            <button>Signup</button>
        </div>
    </form>
      {error!=""?<div className='error'>{error}</div>:[""]}
    </div>
  )
}

export default Signup