export  interface Entry{
    _id:string,
    description:string,
    createat:number,
    status:EntryStatus
}

export type  EntryStatus  =  "pending" | "in-progress"  | "finished"