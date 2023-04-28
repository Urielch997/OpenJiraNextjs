import { Box, Button, TextField } from '@mui/material'
import React, { ChangeEvent, useContext, useState } from 'react'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from 'src/context/entries';
import { UIContext } from 'src/context/ui';

export const NewEntry = () => {
    const [InputValue, setInputValue] = useState('')
    const [Touched, setTouched] = useState(false)
    const {AddNewEntry} = useContext(EntriesContext)
    const {isAdding,adding} = useContext(UIContext)

    const onTextChange = (event:ChangeEvent<HTMLInputElement>) =>{
        setInputValue(event.target.value)
    }

    const onSave = () =>{
        if(InputValue.length  === 0) return
        AddNewEntry(InputValue)
        isAdding(false)
        setTouched(false)
        setInputValue('')
    }

    return (
        <Box sx={{ marginBottom: 2, paddingX: 2 }}>
            {
                adding ?
                    (<><TextField
                        fullWidth
                        sx={{ marginTop: 2, marginBottom: 1 }}
                        placeholder="Nueva entrada"
                        autoFocus
                        multiline
                        label="Nueva entrada"
                        helperText={ InputValue.length <= 0 &&  Touched && "Ingrese un valor"}
                        error={  InputValue.length <= 0 &&  Touched}
                        value={InputValue}
                        onChange={onTextChange}
                        onBlur={()=>setTouched(true)}
                    />
                        <Box display={'flex'} justifyContent="space-between">
                            <Button variant='text' onClick={()=>isAdding(false)}>
                                Cancelar
                            </Button>
                            <Button variant='outlined' color='secondary' endIcon={<SaveOutlinedIcon />} onClick={onSave}>
                                Guardar
                            </Button>
                        </Box>
                    </>
                    ) :
                    (
                        <Button startIcon={<AddCircleOutlineOutlinedIcon />} fullWidth variant='outlined' onClick={()=>isAdding(true)}>
                            AGREGAR TAREA
                        </Button>)

            }


        </Box>
    )
}
