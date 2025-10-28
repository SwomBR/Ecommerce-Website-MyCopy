import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String },
  rating: { type: String, required: true },
  comment: { type: String,required: true },
  date: { type: Date, default: Date.now }
});

const review = mongoose.model('review', reviewSchema);

export default review;