import { useState } from 'react'
import { useThemeContext } from '../hooks/useThemeContext'
import { useUserContext } from '../hooks/useUserContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const UpdatePage = () => {
  //getting initial values
  const location = useLocation();
  const {card_course_id,  card_course_image_url, card_course_title ,card_course_credits, card_course_remarks} = location.state || {}; // Use default values to handle undefined state


  const [dynamic_course_title,set_dynamic_course_title]=useState(card_course_title);
  const [dynamic_card_course_image_url,set_dynamic_card_course_image_url]=useState(card_course_image_url);
  const [dynamic_course_credits,set_dynamic_course_credits]=useState(card_course_credits);
  const [dynamic_course_remarks,set_dynamic_course_remarks]=useState(card_course_remarks);



  //styling purposes only
  const {theme}=useThemeContext()
  const bgColor=(theme=="dark"?"black":"white")
  const textColor= (theme=="dark"?"white":"black")
  document.getElementsByTagName('body')[0].style.backgroundColor=bgColor;
  document.getElementsByTagName('body')[0].style.color=textColor
  document.getElementsByTagName('body')[0].style.transition="0.5s"
  const formBorder=(theme=="dark"?"2px solid yellow":"2px solid white")
  const formShadow=(theme=="dark"?"0 0 1px yellow":"0 0 10px #eb00ff")

  

  //Setting User Context
  
  const {userState}=useUserContext()
  const navigate=useNavigate



  const handleUpdate=async function(e){
    console.log(userState.token)
    e.preventDefault()
    const response=await fetch(`https://course-helper-backend.onrender.com/api/card/${card_course_id}`,{
        method:"PATCH",
        body:JSON.stringify({course_credits:dynamic_course_credits,image_url:dynamic_card_course_image_url,remarks:dynamic_course_remarks,course_title:dynamic_course_title}),
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${userState.token}`
        }
    });
    const json=await response.json();
    if(response.ok){
        console.log("Updated card with id",card_course_id);
        navigate("/")
        return ;
    }
    console.log("error in loging in user",json.error)
  }


  return (
    <div className='adding-course-container' style={{border:formBorder,boxShadow:`${formShadow}`}}>
    <form onSubmit={handleUpdate}>

        <h2>Update</h2>
        <label>Course title:</label>
        <input type="text" name='title' value={dynamic_course_title} onChange={(e)=>{set_dynamic_course_title(e.currentTarget.value)}}/>

        <label>Course Credits:</label>
        <input type="number" name='course_credits' value={dynamic_course_credits} onChange={(e)=>{set_dynamic_course_credits(e.currentTarget.value)}}/>

        <label>Course Image Url:</label>
        <input type="text" name='image_url' value={dynamic_card_course_image_url} onChange={(e)=>{set_dynamic_card_course_image_url(e.currentTarget.value)}}/>
        
        <label>Course Remarks:</label>
        <textarea name='course_remarks' value={dynamic_course_remarks} onChange={(e)=>{set_dynamic_course_remarks(e.currentTarget.value)}}></textarea>
        <div className='bottom-line'>
            <button>Update</button>
            
            <Link to="/">
                <button type='button'>Cancle</button>
            </Link>
            
        </div>
    </form>
    </div>
  )
}

export default UpdatePage