import { Entry } from "src/interfaces";
import { EntriesState } from "./EntriesProvider";

type EntriesActionType = {
    type: '[Entry] Add-Entry',payload:Entry
} |
{
    type:'[Entry] Entry-update',payload:Entry
}
|
{
    type:'[Entry] Refresh-data',payload:Entry[]
}

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
    switch (action.type) {
        case '[Entry] Add-Entry':
            return {
                ...state,
                entries:[...state.entries,action.payload]
            }
            case '[Entry] Entry-update':
            return {
                ...state,
                entries:  state.entries.map(entry=>{
                    if(entry._id  === action.payload._id){
                        entry.status  = action.payload.status
                        entry.description = action.payload.description
                    }
                    return entry;
                })
            }
            case '[Entry] Refresh-data':
            return {
                ...state,
                entries:[...action.payload]
                }
        default:
            return state
    }
}