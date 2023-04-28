import { List, Paper } from "@mui/material"
import { DragEvent, FC, useContext, useMemo } from "react"
import { EntriesContext } from "src/context/entries"
import { UIContext } from "src/context/ui"
import { EntryStatus } from "src/interfaces"
import { EntryCard } from "./"
import styles from  './EntryList.module.css';

interface Props {
  status:EntryStatus
}

export const EntryList:FC<Props> = ({status}) => {
  const {entries,updateEntry} = useContext(EntriesContext)
  const {isDragging,EndDragging} = useContext(UIContext)

  const  entriesByStatus = useMemo(() => entries.filter(entry  => entry.status ===  status), [entries])

  const onDropEntry = (event:DragEvent<HTMLDivElement>) =>{
    const id  = event.dataTransfer.getData("text")
    const  entry  = entries.find(e => e._id === id)!;
    entry.status = status;
    updateEntry(entry);
    EndDragging();
  }

  const allowDrop = (event:DragEvent<HTMLDivElement>) =>{
    event.preventDefault();
  }

  return (
    <div style={{width:'100%'}}
    onDrop={onDropEntry}
    onDragOver={allowDrop}
    className={isDragging ? styles.dragging : ''}
    >
        <Paper sx={{height:'calc(100vh - 180px)',overflowY:'scroll',backgroundColor:'transparent',padding:1}}>
            <List sx={{opacity:isDragging? 0.2 : 1,transition:'all .3s' }}>
                {entriesByStatus.map(entry=>(<EntryCard entry={entry} key={entry._id}/>))}
            </List>
        </Paper>
    </div>
  )
}
