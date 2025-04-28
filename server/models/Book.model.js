import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  ISBN: { type: String, required: true, unique: true },
  publishedDate: { type: String, required: true },
  genre: { type: String, required: true },
  copiesAvailable: { type: Number, required: true }
}, {
  timestamps: true
});

export const Book = mongoose.model('Book', bookSchema);
