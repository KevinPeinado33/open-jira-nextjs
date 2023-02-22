import { FC, ReactNode, useReducer, useEffect } from 'react'

import { Entry } from '@/interfaces'
import { EntriesContext, entriesReducer } from './'
import { entriesApi } from '@/api'

export interface EntriesState {
    entries: Entry[ ]
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [ ]
}

interface Props { children: ReactNode }

export const EntriesProvider: FC< Props > = ({ children }) => {

    const [ state, dispatch ] = useReducer( entriesReducer, ENTRIES_INITIAL_STATE )

    const addNewEntry = async ( description: string ) => {

        const { data } = await entriesApi.post< Entry >('/entries', { description } )
        dispatch({ type: '[Entry] Add-Entry', payload: data })
    
    }

    const updateEntry = async ( { _id, description, status }: Entry ) => {

        try {
            
            const { data } = await entriesApi.put< Entry >(`/entries/${ _id }`, { description, status })

            dispatch({ type: '[Entry] Updated-Entry', payload: data })

        } catch (error) {
            console.log({ error })
        }

    }

    const refreshEntries = async() => {
        const { data } = await entriesApi.get< Entry[ ] >('/entries')
        dispatch({ type: '[Entry] Refresh-Data', payload: data })
    }   

    useEffect(() => {
        refreshEntries()
    }, [])

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