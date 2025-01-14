import { createContext, useReducer } from "react";

export const CardContext=new createContext()
const cardReducer=(state,action)=>{
    switch (action.type) {
        case "SET_CARDS":
            return action.payload;
        case "ADD_CARD":
            return [action.payload,...(state)];
        case "DELETE_CARD":{
            const newState=state.filter((c)=>c.key!=action.payload);
            return newState;
        }
        default:
            break;
    }
}

export const CardContextProvider=function({children}){
    const initialState=[]
    const [cardState,setCardState]=useReducer(cardReducer,initialState)
    return (
        <CardContext.Provider value={{cardState,setCardState}}>
            {children}
        </CardContext.Provider>
    )
}