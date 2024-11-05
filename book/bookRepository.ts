import { dbPromise } from '../repo/repo';

export const getBooksFromDB = async (page: number, limit: number) => {
  const db = await dbPromise;
  const offset = (page - 1) * limit;
  return db.all('SELECT * FROM books LIMIT ? OFFSET ?', limit, offset);
};

export const getBookItemsFromDB = async (bookId: string) => {
  const db = await dbPromise;
  return db.all('SELECT * FROM book_items WHERE book_id = ?', bookId);
};

export const selectBookFromDB = async (userId: string) => {
  const db = await dbPromise;
  return db.get('SELECT * FROM selected_books WHERE user_id = ?', userId);
};

export const getBookDetailFromDB = async (bookId: string) => {
  const db = await dbPromise;
  return db.get('SELECT * FROM book_details WHERE book_id = ?', bookId);
};
