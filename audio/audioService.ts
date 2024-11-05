import { Request, Response } from 'express';
import { saveAudioPathToDB, getAudioPathFromDB } from './audioRepository';

export const uploadAudio = async (req: Request, res: Response) => {
  try {
    const { bookId, userId } = req.body;
    const audioPath = req.file.path;
    await saveAudioPathToDB(bookId, userId, audioPath);
    res.status(200).send('uploaded');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const downloadAudio = async (req: Request, res: Response) => {
  try {
    const { bookId, userId } = req.query;
    const audioPath = await getAudioPathFromDB(bookId as string, userId as string);
    res.sendFile(audioPath);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
