import { Request, Response, NextFunction } from 'express';
import {
  getAllBooks,
  createBook,
  updateBook,
  deleteBooks,
  Book,
  NewBook,
} from '../models/bookModel';

export const fetchBooks = async (req: Request, res: Response, next: NextFunction) => {
  const search = req.query.search as string | undefined;
  try {
    const books = await getAllBooks(search);
    res.json(books);
  } catch (error) {
    next(error);
  }
};

export const addBook = async (req: Request, res: Response, next: NextFunction) => {
  const newBook: NewBook = req.body;
  try {
    const createdBook = await createBook(newBook);
    res.status(201).json(createdBook);
  } catch (error) {
    next(error);
  }
};

export const modifyBook = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = parseInt(req.params.id, 10);
  const updatedFields: Partial<Omit<Book, 'id'>> = req.body;

  try {
    const updatedBook = await updateBook(bookId, updatedFields);
    if (updatedBook) {
      res.json(updatedBook);
    } else {
      res.status(404).send('Book not found.');
    }
  } catch (error) {
    next(error);
  }
};

export const removeBooks = async (req: Request, res: Response, next: NextFunction) => {
  const { ids } = req.body;
  try {
    const deletedCount = await deleteBooks(ids);
    res.json({ message: `${deletedCount} book(s) deleted successfully.` });
  } catch (error) {
    next(error);
  }
};
