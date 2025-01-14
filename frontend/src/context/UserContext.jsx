import { createContext, useReducer } from "react";

export const UserContext=createContext()

const reducerFunction=function(state,action){
    switch (action.type) {
        case "LOGIN":
            return action.payload;
        case "LOGOUT":
            return null;
        default:
            break;
    }
}

export const UserContextProvider=function({children}){
    const initialState=null
    const [userState,setUserState]=useReducer(reducerFunction,initialState);

    return (
        <UserContext.Provider value={{userState,setUserState}}>
            {children}
        </UserContext.Provider>
    )
}