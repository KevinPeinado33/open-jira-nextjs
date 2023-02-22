import mongoose from 'mongoose'

import { db } from '@/database'
import { Entry, IEntry } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
    | { message: string }
    | IEntry

export default function handler( req: NextApiRequest, res: NextApiResponse ) {

    const { id } = req.query

    if ( !mongoose.isValidObjectId( id ) ) {
        return res
                .status(400)
                .json({ message: `El id no es valido ${ id }!` })
    }

    switch ( req.method ) {

        case 'PUT':
            return updateEntry( req, res )

        case 'GET':
            return getEntry( req, res )

        default: 
            return res
                    .status(400)
                    .json({ message: 'Método no existe!'})

    }

}

const getEntry = async (req: NextApiRequest, res: NextApiResponse) => {
    
    const { id } = req.query

    await db.connect()
    const entryInDB = await Entry.findById( id )
    await db.disconnect()

    if ( !entryInDB ) {
        return res
                .status(400)
                .json({ message: `No hay entrada con este ID: ${ id }`})
    }

    res
        .status(200)
        .json( entryInDB )

}

const updateEntry = async ( req: NextApiRequest, res: NextApiResponse< Data > ) => {
    
    const { id } = req.query

    await db.connect()

    const entryUpdate = await Entry.findById( id )

    if ( !entryUpdate ) {
        await db.disconnect()
        return res
                .status(400)
                .json({ message: 'No hay entrada con ese ID!'})        
    }

    const {
        description = entryUpdate.description,
        status      = entryUpdate.status
    } = req.body

    try {

        const updatedEntry = await Entry.findByIdAndUpdate( id, { description, status }, { runValidators: true, new: true })
        await db.disconnect()
        res
            .status(200)
            .json( updatedEntry! )

    } catch ( error ) {

        await db.disconnect()
        res
            .status(400)
            .json({ message: JSON.stringify( error ) })
        
    }

}
