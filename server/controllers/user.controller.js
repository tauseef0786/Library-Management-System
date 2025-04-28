import User  from '../models/User.model.js';
import { Book } from '../models/Book.model.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('borrowedBooks.bookId');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const borrowBook = async (req, res) => {
  const { id } = req.params;
  const { bookId } = req.body;
  try {
    const user = await User.findById(id);
    const book = await Book.findById(bookId);

    if (!user || !book) {
      return res.status(404).json({ error: "User or Book not found" });
    }

    if (book.copiesAvailable <= 0) {
      return res.status(400).json({ error: "No copies available" });
    }

    user.borrowedBooks.push({ bookId, borrowDate: new Date().toISOString() });
    await user.save();

    book.copiesAvailable -= 1;
    await book.save();

    res.json({ message: "Book borrowed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const returnBook = async (req, res) => {
  const { id } = req.params;
  const { bookId } = req.body;
  try {
    const user = await User.findById(id);
    const book = await Book.findById(bookId);

    if (!user || !book) {
      return res.status(404).json({ error: "User or Book not found" });
    }

    const borrowedBook = user.borrowedBooks.find(b => b.bookId.toString() === bookId && !b.returnDate);

    if (!borrowedBook) {
      return res.status(400).json({ error: "Book was not borrowed or already returned" });
    }

    borrowedBook.returnDate = new Date().toISOString();
    await user.save();

    book.copiesAvailable += 1;
    await book.save();

    res.json({ message: "Book returned successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};
