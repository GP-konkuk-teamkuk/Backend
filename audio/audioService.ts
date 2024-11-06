import { Request, Response } from 'express';
import { saveAudioPathToDB, getAudioPathFromDB } from './audioRepository';
import { exec } from 'child_process';
import path from 'path';

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
    let audioPath = await getAudioPathFromDB(bookId as string, userId as string);

    if (!audioPath) {
      const scriptPath = path.join(__dirname, 'generate_audio.py');
      exec(`python3 ${scriptPath} ${bookId} ${userId}`, async (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing script: ${error.message}`);
          return res.status(500).send('Error generating audio');
        }
        if (stderr) {
          console.error(`Script stderr: ${stderr}`);
          return res.status(500).send('Error generating audio');
        }

        audioPath = stdout.trim();
        await saveAudioPathToDB(bookId as string, userId as string, audioPath);
        res.sendFile(audioPath);
      });
    } else {
      res.sendFile(audioPath);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
