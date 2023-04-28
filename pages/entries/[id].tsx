import {capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from '@mui/material'
import React, { ChangeEvent, FC, useContext, useMemo, useState } from 'react'
import { Layout } from 'src/components/layouts'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Entry, EntryStatus } from 'src/interfaces';
import { DeleteOutlineOutlined } from '@mui/icons-material';
import { GetServerSideProps } from 'next';
import {isValidObjectId} from 'mongoose';
import { dbEntries } from 'src/database';
import { EntriesContext } from 'src/context/entries';
import { dateFunctions } from 'src/utils';

const validStatus:EntryStatus[] = ['pending','in-progress','finished'] 

interface Props {
    entry:Entry
}

export const EntryPage:FC<Props> = ({entry}) => {
    const {updateEntry,deleteEntry} = useContext(EntriesContext)
    const [InputValue,setInputValue] = useState(entry.description);
    const [status, setstatus] = useState<EntryStatus>(entry.status);
    const [touched, settouched] = useState(false);

    const onTextFiledChanged = (event:ChangeEvent<HTMLInputElement>) =>{
        setInputValue(event.target.value);
    }

    const onStatusChanged = (event:ChangeEvent<HTMLInputElement>) => {
        setstatus(event.target.value as EntryStatus)
    }

    const onSave = () =>{
        if(InputValue.trim().length === 0) return;

        const updatedEntry:Entry = {
            ...entry,
            status,
            description:InputValue
        }

        updateEntry(updatedEntry,true);
    }

    const onDelete = () =>{
        deleteEntry(entry._id);
    }

   const isNotValid = useMemo(() =>InputValue.length <= 0 && touched , [InputValue,touched])

  return (
    <Layout title={InputValue.substring(0,20) + '...'}>
        <>
        <Grid  container
        justifyContent={'center'}
        sx={{marginTop:2}}>
            <Grid item xs={12} sm={8} md={6}>
                <Card>
                    <CardHeader
                    title={`Entrada: ${InputValue}`}
                    subheader={`Creada hace ${dateFunctions.getFormatDistanceToNow(entry.createat)}`}
                    />
                    <CardContent>
                        <TextField 
                        sx={{marginTop:2,marginBottom:1}}
                        fullWidth
                        placeholder='Nueva entrada'
                        multiline
                        autoFocus
                        label="Nueva entrada"
                        value={InputValue}
                        onChange={onTextFiledChanged}
                        helperText={isNotValid && 'ingrese un valor'}
                        error={isNotValid}
                        onBlur={()=>settouched(true)}
                        />

                        <FormControl>
                            <FormLabel>Estado:</FormLabel>
                            <RadioGroup
                                row
                                value={status}
                                onChange={onStatusChanged}
                            >
                                {validStatus.map(option => (
                                <FormControlLabel
                                    key={option}
                                    value={option}
                                    control={<Radio/>}
                                    label={capitalize(option)}
                                />
                                ))}
                            </RadioGroup>
                        </FormControl>

                        {/**Radio */}
                    </CardContent>

                    <CardActions>
                        <Button
                        startIcon={<SaveOutlinedIcon/>}
                        variant="contained"
                        fullWidth
                        onClick={onSave}
                        disabled={InputValue.length <= 0}
                        >
                            Save
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>

        <IconButton sx={{position:'fixed',bottom:30,right:30,backgroundColor:'red'}} onClick={onDelete}>
            <DeleteOutlineOutlined/>
        </IconButton>
        </>
    </Layout>
  )
}

export const getServerSideProps:GetServerSideProps = async ({params}) =>{
    const { id } = params as {id:string};

   const entry = await dbEntries.getEntryById(id);

    if(!entry){
        return {
            redirect:{
                destination:'/',
                permanent:false
            }
        }
    }

    return {
        props:{
            entry
        }
    }
}

export default EntryPage;
