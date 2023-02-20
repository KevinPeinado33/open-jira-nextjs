import { ChangeEvent, useContext, useState } from 'react'
import { Box, Button, TextField } from '@mui/material'

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { EntriesContext } from '@/context/entries'
import { UIContext } from '@/context/ui'
import { EntryStatus } from '@/interfaces'

interface Props { status: EntryStatus }
export const NewEntry = () => {

    const [inputValue, setInputValue] = useState('')
    const [touched, setTouched]       = useState( false )

    const { addNewEntry } = useContext( EntriesContext )
    const { 
        isAddingEntry, 
        setIsAddingEntry 
    } = useContext( UIContext )

    const onTextFieldChanged = ( { target  }: ChangeEvent< HTMLInputElement > ) => {
        setInputValue( target.value )
    }

    const onSave = () => {

        if ( inputValue.length <= 0 ) return

        addNewEntry( inputValue )

        setIsAddingEntry( false )
        setTouched( false )
        setInputValue( '' )
    
    }

    return (
        <Box sx={{ marginBottom: 2, paddingX: 1.5 }} >

            {
                isAddingEntry ? (
                    <>
                        <TextField 
                            fullWidth
                            sx={{ marginTop: 2, marginBottom: 1 }}
                            placeholder='Nueva entrada'
                            autoFocus
                            multiline
                            label='Nueva Entrada'
                            helperText={ inputValue.length <= 0 && touched && 'Ingrese un valor pe crrano' }
                            error={ inputValue.length <= 0 && touched }
                            value={ inputValue }
                            onChange={ onTextFieldChanged }
                            onBlur={ () => setTouched( true ) }
                        />
                        <Box
                            display='flex'
                            justifyContent='space-between'
                        >

                            <Button
                                variant='text'
                                onClick={ () => setIsAddingEntry( false ) }
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant='outlined'
                                color='secondary'
                                endIcon={ <SaveOutlinedIcon /> }
                                onClick={ onSave }
                                >
                                Guardar
                            </Button>

                        </Box>
                    </>
                )
                :
                (
                    <Button
                        startIcon={ <AddCircleOutlinedIcon /> }
                        fullWidth
                        variant='outlined'
                        onClick={ () => setIsAddingEntry( true ) }
                    >
                        Crear entrada
                    </Button>
                )
            }

        </Box>
    )
}
