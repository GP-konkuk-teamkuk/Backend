import { dbPromise } from '../repo/repo';

export const getBooksFromDB = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  return dbPromise.get('SELECT * FROM books LIMIT ? OFFSET ?', [limit, offset]);
};

export const getBookItemsFromDB = async (bookId: string) => {
  return dbPromise.get('SELECT * FROM book_items WHERE book_id = ?', [bookId]);
};

export const selectBookFromDB = async (userId: string) => {
  return dbPromise.get('SELECT * FROM selected_books WHERE user_id = ?', [userId]);
};

export const getBookDetailFromDB = async (bookId: string) => {
  return dbPromise.get('SELECT * FROM book_details WHERE book_id = ?', [bookId]);
};
