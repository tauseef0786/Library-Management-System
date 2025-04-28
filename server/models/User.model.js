import mongoose from 'mongoose';

const borrowedBookSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  borrowDate: { type: String, required: true },
  returnDate: { type: String }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  borrowedBooks: [borrowedBookSchema]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
