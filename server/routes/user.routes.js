import express from 'express';
import { createUser, getUsers, borrowBook, returnBook } from '../controllers/user.controller.js';
import { validateUser } from '../middleweares/validate.middleware.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', validateUser, createUser);
router.post('/:id/borrow', borrowBook);
router.post('/:id/return', returnBook);

export default router;
