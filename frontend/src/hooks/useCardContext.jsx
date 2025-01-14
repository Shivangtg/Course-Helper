import { useContext } from "react";
import { CardContext } from "../context/CardContext";

export const useCardContext=()=>{
    const context=useContext(CardContext);
    return context;
}