import { useEffect } from "react"
import Card from "../components/Card"
import { useThemeContext } from '../hooks/useThemeContext.jsx'
import { useCardContext } from "../hooks/useCardContext.jsx"
import AddButton from "../components/AddButton.jsx"
import { useUserContext } from "../hooks/useUserContext.jsx"


const Home = () => {
  // const obj={course_title:"MTH113",course_credits:6}
  const {cardState,setCardState}=useCardContext()
  const {userState}=useUserContext()
  
  useEffect(()=>{

    const fetchCards=async()=>{
      // console.log(userState)
      const response=await fetch("https://course-helper-backend.onrender.com/api/card/",{
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${userState?userState.token : JSON.parse(localStorage.getItem("user")).token}`
        }
      });
      const json=await response.json();
      if(response.ok){
        const cardElement=json.data.map((cardData)=>{
          return (<Card key={cardData._id} cardData={cardData}></Card>)
        })
        setCardState({type:"SET_CARDS",payload:cardElement})
      }else{
        // console.log("can't fetch data",json.error);
      }
    }

    fetchCards()
  },[])



  //For Styling Purposes
  const {theme}=useThemeContext()
  const bgColor=(theme=="dark"?"black":"white")
  const textColor= (theme=="dark"?"white":"black")
  document.getElementsByTagName('body')[0].style.backgroundColor=bgColor;
  document.getElementsByTagName('body')[0].style.color=textColor
  document.getElementsByTagName('body')[0].style.transition="0.5s"
  // console.log("shaving",cardState[0].key)
  return (
    <>
      <div style={{color:textColor,backgroundColor:bgColor}} className='card-grid'>
          {cardState}
          {/* <Card cardData={obj}></Card>
          <Card cardData={obj}></Card>
          <Card cardData={obj}></Card>
          <Card cardData={obj}></Card>
          <Card cardData={obj}></Card>
          <Card cardData={obj}></Card>
          <Card cardData={obj}></Card>
          <Card cardData={obj}></Card>
          <Card cardData={obj}></Card>
          <Card cardData={obj}></Card>
          <Card cardData={obj}></Card>
          <Card cardData={obj}></Card> */}
          
      </div>
      <AddButton/>
    </>
  )
}

export default Home