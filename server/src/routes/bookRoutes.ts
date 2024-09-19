// src/routes/bookRoutes.ts
import express from 'express';
import {
  fetchBooks,
  addBook,
  modifyBook,
  removeBooks,
} from '../controllers/bookController';
import {
  validateBook,
  validateBookUpdate,
  validateDelete,
} from '../middleware/validation';

const router = express.Router();

// GET /books
router.get('/', fetchBooks);

// POST /books
router.post('/', validateBook, addBook);

// PUT /books/:id
router.put('/:id', validateBookUpdate, modifyBook);

// DELETE /books
router.delete('/', validateDelete, removeBooks);

export default router;
