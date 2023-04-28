import { FC, useReducer, useState } from "react"
import { UIContext,uiReducer } from "./"

export interface  UIState {
    sidemenuOpen:  boolean,
    adding:boolean,
    isDragging:boolean,
}

const UI_INITIAL_STATE:UIState = {
    sidemenuOpen:false,
    adding:false,
    isDragging:false
}

interface Props {
    children:JSX.Element
}


export const UIProvider:FC<Props> = ({children}) => {
    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const OpenSideMenu = () =>{
        dispatch({type:'UI - Open Sidebar'})
    }

    const CloseSideMenu  = () =>{
        dispatch({type:'UI - Close Sidebar'})
    }

    const isAdding = (isAdd:boolean) =>{
        dispatch({type:'UI  - isAdding',payload:isAdd})
    }

    const StartDragging = () =>{
        dispatch({type:'UI - Start Dragging'})
    }

    const EndDragging = () =>{
        dispatch({type:'UI - End Dragging'})
    }

    return (<UIContext.Provider value={{
        ...state,
        OpenSideMenu,
        CloseSideMenu,
        isAdding,
        StartDragging,
        EndDragging
    }}>
        {children}
    </UIContext.Provider>)
}
