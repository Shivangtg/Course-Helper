import { Link } from "react-router-dom"
import { useThemeContext } from '../hooks/useThemeContext'
const AddButton = () => {
  const {theme}=useThemeContext()
  const bgcolor=(theme=="dark"?"blueviolet":"#2be2e2")
  return (
    <Link to="/adding_course">
        <div className='addButton' >
            <button style={{backgroundColor:bgcolor}}>
                <img src="/images/add.svg" width="43px"/>
            </button>
        </div>
    </Link>
  )
}

export default AddButton