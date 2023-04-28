import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { DragEvent, FC, useContext } from 'react'
import { UIContext } from 'src/context/ui'
import { Entry } from 'src/interfaces'
import { dateFunctions } from 'src/utils'

interface Props {
  entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { StartDragging, EndDragging } = useContext(UIContext)
  const router = useRouter();

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text', entry._id)
    StartDragging();
  }

  const onDragEnd = () => {
    EndDragging();
  }

  const onClick = () =>{
    router.push(`/entries/${entry._id}`)
  }


  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant='body2'>{`hace ${dateFunctions.getFormatDistanceToNow(entry.createat)}`}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
