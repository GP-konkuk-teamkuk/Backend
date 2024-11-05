import { dbPromise } from '../repo/repo';

export const getAudioList = async () => {
  return dbPromise.get('SELECT * FROM audio', []);
};

export const getBookItems = async () => {
  return dbPromise.get('SELECT * FROM books', []);
};

export const getUserSelection = async () => {
  return dbPromise.get('SELECT * FROM users', []);
};
