import { Request, Response } from 'express';
import { getBooksFromDB, getBookItemsFromDB, selectBookFromDB, getBookDetailFromDB } from './bookRepository';

export const getBookList = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const books = await getBooksFromDB(page, limit);
    res.json(books);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getBookItems = async (req: Request, res: Response) => {
  try {
    const bookId = req.query.bookId as string;
    const items = await getBookItemsFromDB(bookId);
    res.json(items);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const selectBook = async (req: Request, res: Response) => {
  try {
    const book = await selectBookFromDB(req.query.userId as string);
    res.json(book);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getBookDetail = async (req: Request, res: Response) => {
  try {
    const detail = await getBookDetailFromDB(req.query.bookId as string);
    res.json(detail);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
