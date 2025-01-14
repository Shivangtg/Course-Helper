import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeContextProvider } from "./context/ThemeContext"
import { CardContextProvider } from "./context/CardContext"
import { UserContextProvider } from "./context/UserContext"
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
      <CardContextProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </CardContextProvider>
    </UserContextProvider>
  </StrictMode>,
)
