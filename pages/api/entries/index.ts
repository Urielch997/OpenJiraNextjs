// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from 'src/database';
import { Entry, IEntry } from 'src/models';

type Data = {
  message: string
} | IEntry[]
  | IEntry


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getEntries(res);
    case 'POST':
      return postEntry(req,res);
    default:
      return res.status(400).json({ message: 'End point no existe' })
  }


}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect();

  const entries = await Entry.find().sort({ createat: 'ascending' });

  await db.disconnect();

  res.status(200).json(entries)
}

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {


  const { description = '' } = req.body;

  const newEntry = new Entry({
    description,
    createat: Date.now()
  });

  try {
    await db.connect();
    newEntry.save();
    await db.disconnect();
    res.status(201).json(newEntry)
  } catch (error) {
    await db.disconnect();
    return res.status(500).json({ message: 'Algo salio mal revisar consola de servidor' })
  }
}
