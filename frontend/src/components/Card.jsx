import { Link } from "react-router-dom";
import { useCardContext } from "../hooks/useCardContext";
import { useThemeContext } from "../hooks/useThemeContext";
import { useUserContext } from "../hooks/useUserContext";

const Card = ({cardData}) => {

  //For styling purposes
  const {theme}=useThemeContext()
  const buttonBg=(theme=="dark"?"white":"#ffd3d3")
  const cardShadow=(theme=="dark"?"0 0 1rem #00ff58":"0 0 1rem #af00ff")
  const interactionBtnGlow=(theme=="dark"?"darkGlow":"lightGlow")
  const {setCardState}=useCardContext()
  
  const {userState}=useUserContext()
  const deletingCard=async function(){
    const response=await fetch(`https://course-helper-backend.onrender.com/api/card/${cardData._id}`,{
        method:"DELETE",
        headers:{
            "Authorization":`Bearer ${userState.token}`
        }
    })
    const json=await response.json();
    if(response.ok){
        console.log("deleted the card",json.data);
        setCardState({type:"DELETE_CARD",payload:json.data._id})
    }else{
        console.log("can'nt delete the card",json.error)
    }
  }
  

  return (
    
        <div className='card' style={{boxShadow:cardShadow}}>
            <img src={cardData.image_url ? cardData.image_url: "https://media.daily.dev/image/upload/f_auto,q_auto/v1/posts/74a24df1578878cc2a9e6aeec60c9f61?_a=AQAEuj9" } className="card-image" alt="course image" />
            
            <div>
                <strong>Course Title: </strong>{cardData.course_title} 
            </div>
            
            <div>
                <strong>Course Credits: </strong>{cardData.course_credits} 
            </div>

            <button className="deleteBtn" onMouseEnter={(e)=>{e.currentTarget.classList.add(interactionBtnGlow)}} onMouseLeave={(e)=>{e.currentTarget.classList.remove(interactionBtnGlow)}}  onClick={deletingCard} style={{backgroundColor:buttonBg}}>
                <img src="/images/delete.svg" style={{backgroundColor:buttonBg,borderRadius:"50%"}} width="30px" />
            </button>

            <Link to="/update" state={{
                card_course_id:cardData._id,
                card_course_image_url:cardData.image_url,
                card_course_title:cardData.course_title,
                card_course_credits:cardData.course_credits,
                card_course_remarks:cardData.remarks
            }}>
                <button className="updateBtn" onMouseEnter={(e)=>{e.currentTarget.classList.add(interactionBtnGlow)}} onMouseLeave={(e)=>{e.currentTarget.classList.remove(interactionBtnGlow)}} style={{backgroundColor:buttonBg}}>
                    <img src="/images/update.svg" style={{backgroundColor:buttonBg,borderRadius:"50%"}} width="30px" />
                </button>
            </Link>
        </div>
    
  )
}

export default Card