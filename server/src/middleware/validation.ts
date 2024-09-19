import { Request, Response, NextFunction } from 'express';
import { NewBook } from '../models/bookModel';

export const validateBook = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, author, price, quantity } = req.body as NewBook;

  if (
    typeof title !== 'string' ||
    typeof author !== 'string' ||
    typeof price !== 'number' ||
    typeof quantity !== 'number'
  ) {
    return res.status(400).send('Invalid book data provided.');
  }

  next();
};

export const validateBookUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, author, price, quantity } = req.body;

  if (
    (title !== undefined && typeof title !== 'string') ||
    (author !== undefined && typeof author !== 'string') ||
    (price !== undefined && typeof price !== 'number') ||
    (quantity !== undefined && typeof quantity !== 'number')
  ) {
    return res.status(400).send('Invalid data types for book fields.');
  }

  if (
    title === undefined &&
    author === undefined &&
    price === undefined &&
    quantity === undefined
  ) {
    return res.status(400).send('No fields provided for update.');
  }

  next();
};

export const validateDelete = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || !ids.every((id: any) => typeof id === 'number')) {
    return res
      .status(400)
      .send('Invalid data. "ids" must be an array of numbers.');
  }

  if (ids.length === 0) {
    return res.status(400).send('"ids" array cannot be empty.');
  }

  next();
};
