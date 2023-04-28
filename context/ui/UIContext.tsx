import { createContext } from "react";

interface  ContextProps {
    sidemenuOpen:  boolean,
    OpenSideMenu:()=>void,
    CloseSideMenu:()=>void,
    isAdding:(isAdd:boolean)=>void,
    adding:boolean,
    StartDragging:()=>void,
    EndDragging:()=>void,
    isDragging:boolean
}

export const UIContext = createContext({} as ContextProps)