import { Link } from 'react-router-dom'
import { useThemeContext } from '../hooks/useThemeContext.jsx'
import { useUserContext } from '../hooks/useUserContext.jsx'

const Navbar = () => {
  //   styling thing
  const {theme,setTheme}=useThemeContext()
  const bgColor=(theme=="dark"?"black":"white")
  const textColor= (theme=="dark"?"white":"black")
  const linkColor= (theme=="dark"?"white":"black")
  const themeImage= (theme=="dark"?"/images/sun.svg":"/images/moon.svg")
  const themeDispatchType= (theme=="dark"?"SET_LIGHT":"SET_DARK")
  const navbarShadow=(theme=="dark"?"#00fff3":"red")

  //User Logic
  const {userState,setUserState}=useUserContext()

  const handleLogout=()=>{
    setUserState({type:"LOGOUT"});
    localStorage.clear("user");
  }
  return (
    <>
    <div className='Navbar' style={{color:textColor,backgroundColor:bgColor,boxShadow:`0 1px 10px ${navbarShadow}`, transition:"0.5s"}}>
        <h2><Link to="/" style={{color:linkColor}}>Course Helper</Link></h2>
        
        <div className='authLinks'>
            <button onClick={()=>setTheme({type:themeDispatchType})}><img src={themeImage} alt="" width="29px" /></button>
            {!userState?(
              <>
                <Link style={{color:linkColor}} to="/login">Login</Link>
                <Link to="/signup" style={{color:linkColor}}>Signup</Link>
              </>
              ):(
                <>
                <span>{userState.name}</span>
                <button className='LogoutBtn' onClick={handleLogout}>Log Out</button>
                </>
              )}
        </div>
    </div>
    </>
  )
}

export default Navbar