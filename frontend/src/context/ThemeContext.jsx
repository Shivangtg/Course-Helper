import { useReducer } from "react";
import { createContext } from "react";

export const ThemeContext=new createContext()
const reducerFunction=function(state,action){
    switch (action.type) {
        case "SET_DARK":
            return "dark";
        case "SET_LIGHT":
            return "light";
        default:
            break;
    }
}
export const ThemeContextProvider=function({children}){
    const initialState="dark";
   
    const [theme,setTheme]=useReducer(reducerFunction,initialState);
    return (
        <ThemeContext.Provider value={{theme,setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}