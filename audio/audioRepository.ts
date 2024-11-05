import { dbPromise } from '../repo/repo';

export const saveAudioPathToDB = async (bookId: string, userId: string, audioPath: string) => {
  const db = await dbPromise;
  await db.run('INSERT INTO audio (book_id, user_id, audio_file) VALUES (?, ?, ?)', [
    bookId,
    userId,
    audioPath,
  ]);
};

export const getAudioPathFromDB = async (bookId: string, userId: string) => {
  const db = await dbPromise;
  const row = await db.get('SELECT audio_file FROM audio WHERE book_id = ? AND user_id = ?', [
    bookId,
    userId,
  ]);
  return row ? row.audio_file : null;
};
