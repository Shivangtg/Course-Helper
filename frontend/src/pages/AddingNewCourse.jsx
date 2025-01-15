import { useState } from 'react'
import { useCardContext } from '../hooks/useCardContext';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { useThemeContext } from '../hooks/useThemeContext';
import { useUserContext } from '../hooks/useUserContext';
import {jwtDecode} from "jwt-decode";






const AddingNewCourse = () => {
  const [course_title,set_course_title]=useState('');
  const [course_credits,set_course_credits]=useState('');
  const [image_url,set_image_url]=useState('');
  const [remarks,set_remarks]=useState('');
  const [error,setError]=useState("");

  //For Styling Purposes
  const {theme}=useThemeContext()
  const bgColor=(theme=="dark"?"black":"white")
  const textColor= (theme=="dark"?"white":"black")
  document.getElementsByTagName('body')[0].style.backgroundColor=bgColor;
  document.getElementsByTagName('body')[0].style.color=textColor
  document.getElementsByTagName('body')[0].style.transition="0.5s"
  const formBorder=(theme=="dark"?"2px solid yellow":"2px solid white")
  const formShadow=(theme=="dark"?"0 0 10px yellow":"0 0 10px red")

  //adding course logic
  const {userState}=useUserContext()
  const {setCardState}=useCardContext()
  const navigate=useNavigate()
  //decoding token
  // const {_id}=decoder(useState.token)
  // console.log("shivang",_id)
  const handleSubmit=async function(e){
    e.preventDefault();
    setError("");
    try {
      // console.log(course_credits,course_title,image_url)
    const decoded=jwtDecode(userState.token)
    const reqBody=image_url?(remarks?{course_credits:parseInt(course_credits),course_title,image_url,user_id:decoded._id,remarks}:{course_credits:parseInt(course_credits),course_title,image_url,user_id:decoded._id}):(remarks?{course_credits:parseInt(course_credits),course_title,user_id:decoded._id,remarks}:{course_credits:parseInt(course_credits),course_title,user_id:decoded._id})
    // console.log(reqBody,JSON.stringify(reqBody))
    const response=await fetch("https://course-helper-backend.onrender.com/api/card/",{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            "Authorization":`Bearer ${userState.token}`
        },
        body:JSON.stringify(reqBody),
    })
    // console.log(response)
    const json=await response.json()
    if(response.ok){
        setError("");
        const newCard=<Card cardData={json.data}/>
        setCardState({type:"ADD_CARD",payload:newCard})
        navigate("/")
    }else{
        setError(json.error)
        // console.log("can't add course to the card list",json.error)
    }
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <div className='adding-course-container' style={{border:formBorder,boxShadow:`${formShadow}`}}>
    <form onSubmit={handleSubmit}>

        <h2>Add a New Course</h2>
        <label>Course Title:</label>
        <input type="text" name='course_title' value={course_title} onChange={(e)=>{set_course_title(e.currentTarget.value)}}/>

        <label>Course Credits:</label>
        <input type="number" name='course_credits' value={course_credits} onChange={(e)=>{set_course_credits(e.currentTarget.value)}}/>

        <label>Course Image Url:</label>
        <input type="text" name='image_url' value={image_url} onChange={(e)=>{set_image_url(e.currentTarget.value)}}/>
        
        <label>Course Remarks:</label>
        <input type="text" name='remarks' value={remarks} onChange={(e)=>{set_remarks(e.currentTarget.value)}}/>
        
        <button>Add Course</button>
    </form>
      {error!=""?<div className='error'>{error}</div>:[""]}
    </div>
  )
}

export default AddingNewCourse