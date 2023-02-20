import { FC, ReactNode, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'


import { Entry } from '@/interfaces'
import { EntriesContext, entriesReducer } from './'

export interface EntriesState {
    entries: Entry[ ]
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'pending: Describeme esta p',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            _id: uuidv4(),
            description: 'in-progress: Describeme esta p',
            status: 'in-progress',
            createdAt: Date.now() - 1000000
        },
        {
            _id: uuidv4(),
            description: 'finished: Describeme esta p',
            status: 'finished',
            createdAt: Date.now() - 100000
        },
    ]
}

interface Props { children: ReactNode }

export const EntriesProvider: FC< Props > = ({ children }) => {

    const [ state, dispatch ] = useReducer( entriesReducer, ENTRIES_INITIAL_STATE )

    const addNewEntry = ( description: string ) => {

        const newEntry: Entry = {
            status: 'pending',
            _id: uuidv4(),
            createdAt: Date.now(),
            description,
        }

        dispatch({ type: '[Entry] Add-Entry', payload: newEntry })
    
    }

    const updateEntry = ( entry: Entry ) => {
        dispatch({ type: '[Entry] Updated-Entry', payload: entry })
    }

    return (
        <EntriesContext.Provider value={{
            ...state,
            addNewEntry,
            updateEntry
        }} >
            { children }
        </EntriesContext.Provider>
    )
}