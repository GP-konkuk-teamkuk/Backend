import { getAudioList, getBookItems, getUserSelection, addBook, addUser } from './adminRepository';

export const fetchAudioList = async () => {
  return await getAudioList();
};

export const fetchBookItems = async () => {
  return await getBookItems();
};

export const fetchUserSelection = async () => {
  return await getUserSelection();
};

export const createBook = async (title: string, author: string, publishedDate: string, description: string) => {
  return await addBook(title, author, publishedDate, description);
};

export const createUser = async (name: string, email: string, password: string) => {
  return await addUser(name, email, password);
};
