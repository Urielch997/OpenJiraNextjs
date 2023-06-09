import { FC, useEffect, useReducer } from "react"
import { Entry } from "src/interfaces"
import { EntriesContext } from "./EntriesContext"
import { entriesReducer } from "./entriesReducer"
import { entriesApi } from "src/apis";
import { useSnackbar } from "notistack";

export interface EntriesState {
    entries: Entry[],
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [],
}

interface Props {
    children: JSX.Element
}


export const EntriesProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)
    const {enqueueSnackbar} = useSnackbar();

    const AddNewEntry = async (description:string) =>{
       const {data} = await entriesApi.post<Entry>('/entries',{description})

        dispatch({type:'[Entry] Add-Entry',payload:data})
    }

    const updateEntry = async ({_id,description,status}:Entry,showSnackbar = false) =>{
        try{
        const {data} = await entriesApi.put<Entry>(`/entries/${_id}`,{description,status})
        dispatch({type:"[Entry] Entry-update",payload:data})
        //Mostrar snackbar
        if(showSnackbar){
        enqueueSnackbar('Entrada actualizada',{
            variant:'success',
            autoHideDuration:1500,
            anchorOrigin:{
                vertical:'top',
                horizontal:'right'
            }
        });
    }
        }catch(error){
            console.log({error})
        }
    }

    const deleteEntry = async (id:string) =>{
        await entriesApi.delete(`/entries/${id}`);
        refreshEntries();
    }

    const refreshEntries = async () =>{
        const {data} = await entriesApi.get<Entry[]>("/entries");
        dispatch({type:'[Entry] Refresh-data',payload:data})
    }

    useEffect(() => {
        refreshEntries();
    }, [])
    

    return (<EntriesContext.Provider value={{
        ...state,
        AddNewEntry,
        updateEntry,
        deleteEntry
    }}>
        {children}
    </EntriesContext.Provider>)
}
