import { ChangeEvent, useState, useMemo, useContext } from 'react';
import { GetServerSideProps, NextPage } from 'next'
import { 
    Grid, 
    Card, 
    CardHeader, 
    CardContent, 
    TextField,
    CardActions,
    Button,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    capitalize
} from '@mui/material'

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

import { Layout } from '@/components/layouts'
import { Entry, EntryStatus } from '@/interfaces'
import IconButton from '@mui/material/IconButton'
import { IEntry } from '@/models'
import { dbEntries } from '@/database'
import { EntriesContext } from '@/context/entries';
import { useRouter } from 'next/router';
import { dateFunctions } from '@/utils';

const validStatus: EntryStatus[] = [ 'pending', 'in-progress', 'finished' ]

interface Props { entry: IEntry }

const EntryPage: NextPage< Props > = ({ entry }) => {

    const [ inputValue, setInputValue ] = useState(entry.description)
    const [ status, setStatus ]         = useState< EntryStatus >(entry.status)
    const [ touched, setTouched ]       = useState(false)

    const router                        = useRouter()
    const { updateEntry }               = useContext( EntriesContext )

    const isNotValid                    = useMemo(() => inputValue.length <= 0 && touched, [ inputValue, touched ])

    const onInputValueChanged = ( { target }: ChangeEvent< HTMLInputElement > ) => {
        setInputValue( target.value )
    }

    const onStatusChanged = ( { target }: ChangeEvent< HTMLInputElement >) => {
        setStatus( target.value as EntryStatus )
    }

    const onSave = () => {
        
        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue
        }

        updateEntry( updatedEntry, false )

        router.push('/')

    }

    return (
        <Layout title={ inputValue.substring(0,20) + '...'}>
            <Grid
                container
                justifyContent='center'
                sx={{ marginTop: 2 }}
            >
                <Grid
                    item
                    xs={ 12 }
                    sm={ 8 }
                    md={ 6 }
                >
                    <Card>
                        <CardHeader
                            title={`Entrada: ${ inputValue }`}
                            subheader={`Creada ${ dateFunctions.getFormatDistanceToNow( entry.createdAt ) }`}
                        />
                            <CardContent>
                                <TextField 
                                    sx={{ marginTop: 2, marginBottom: 1 }}
                                    fullWidth
                                    placeholder='Nueva entrada'
                                    autoFocus
                                    multiline
                                    label='Nueva entrada'
                                    value={ inputValue }
                                    onChange={ onInputValueChanged }
                                    helperText={ isNotValid && 'Ingrese un valor pe mmvrga!'}
                                    onBlur={ () => setTouched( true ) }
                                    error={ isNotValid }
                                />

                                <FormControl>
                                    <FormLabel>Estado:</FormLabel>
                                    <RadioGroup
                                        row
                                        value={ status }
                                        onChange={ onStatusChanged }
                                    >
                                        {
                                            validStatus.map(option => (
                                                <FormControlLabel
                                                    key={ option }
                                                    value={ option }
                                                    control={ <Radio /> }
                                                    label={ capitalize(option) }
                                                />
                                            ))
                                        }
                                    </RadioGroup>
                                </FormControl>

                            </CardContent>

                            <CardActions>
                                <Button
                                    startIcon={ <SaveOutlinedIcon /> }
                                    variant='contained'
                                    fullWidth
                                    onClick={ onSave }
                                    disabled={ inputValue.length <= 0 }
                                >
                                    Save
                                </Button>
                            </CardActions>
                        
                    </Card>

                </Grid>

            </Grid>

            <IconButton 
                sx={{
                    position: 'fixed',
                    bottom: 30,
                    right: 30,
                    backgroundColor: 'error.dark'
                }}
            >
                <DeleteOutlinedIcon />
            </IconButton>

        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { id } = ctx.params as { id: string }

    const entry = await dbEntries.getEntryById( id )

    if ( !entry ) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}

export default EntryPage
