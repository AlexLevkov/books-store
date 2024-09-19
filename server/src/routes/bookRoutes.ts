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

router.get('/', fetchBooks);
router.post('/', validateBook, addBook);
router.put('/:id', validateBookUpdate, modifyBook);
router.delete('/', validateDelete, removeBooks);

export default router;
