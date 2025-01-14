import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom"
import Home from "./pages/home"
import Navbar from "./components/Navbar"

import AddingNewCourse from "./pages/AddingNewCourse"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { useUserContext } from "./hooks/useUserContext"
import UpdatePage from "./pages/UpdatePage"


function App() {
  const {userState}=useUserContext()
  return (
    
          <BrowserRouter>
            <Navbar/>
            <div className="big-dabba">
              <Routes>
                <Route path="/" element={userState?<Home/>:<Navigate to="/login" />}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/adding_course" element={<AddingNewCourse/>}/>
                <Route path="/update" element={userState?<UpdatePage/>:<Navigate to="/login" />}/>
              </Routes>
            </div>
          </BrowserRouter>
        
  )
}

export default App
// const updatingCard=async function(e){
//   const response=await fetch(`http://localhost:6789/api/card/${cardData._id}`,{
//       method:"PATCH",
//       headers:{
//           "Authorization":`Bearer ${userState.token}`
//       }

//   })
// }