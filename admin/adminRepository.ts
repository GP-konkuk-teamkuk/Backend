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

export const addBook = async (title: string, author: string, publishedDate: string, description: string) => {
  return dbPromise.run(
    'INSERT INTO books (title, author, published_date, description) VALUES (?, ?, ?, ?)',
    [title, author, publishedDate, description],
  );
};

export const addUser = async (name: string, email: string, password: string) => {
  return dbPromise.run(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password],
  );
};
