import express from 'express';
import { createBook, deleteBook, getBookById, getBooks, updateBook } from '../controllers/book.controller.js';
import  {validateBook}  from '../middleweares/validate.middleware.js';

const router = express.Router();

router.get('/', getBooks);
router.post('/', validateBook, createBook);
router.get('/:id', getBookById);
router.put('/:id', validateBook, updateBook);
router.delete('/:id', deleteBook);

export default router;
