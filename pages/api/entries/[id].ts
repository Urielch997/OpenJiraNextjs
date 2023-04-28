// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from 'src/database';
import { Entry, IEntry } from 'src/models';

type Data = {
    message: string
} | IEntry

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { id } = req.query;

    if (!mongoose.isValidObjectId(id)) {
        res.status(400).json({ message: 'El id no es  valido ' + id })
    }

    switch (req.method) {
        case "PUT":
            return updateEntry(req, res);

        case "GET":
            return getEntry(req, res);

        case "DELETE":
            return deleteEntry(req, res);
        default:
            return res.status(400).json({ message: 'Metodo  no existe' });
    }


}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;

    await db.connect();

    const entryUpdated = await Entry.findById(id);

    if (!entryUpdated) {
        await db.disconnect();
        res.status(400).json({ message: 'No hay entrada con ese ID: ' + id })
    }

    const { description = entryUpdated?.description, status = entryUpdated?.status } = req.body

    try {
        const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true })
        await db.disconnect();
        res.status(200).json(updatedEntry!)
    } catch (error: any) {
        await db.disconnect();
        res.status(400).json({ message: error.errors.status.message })
    }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query
    try {
        await db.connect();
        const entry = await Entry.findById(id);
        await db.disconnect();
        res.status(200).json(entry!)
    } catch (error: any) {
        await db.disconnect();
        res.status(400).json({ message: error.errors.status.message })
    }
}

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query
    try {
        await db.connect();
        const entry = await Entry.findByIdAndDelete(id);
        await db.disconnect();
        res.status(200).json(entry!)
    } catch (error: any) {
        await db.disconnect();
        res.status(400).json({ message: error.errors.status.message })
    }
}
