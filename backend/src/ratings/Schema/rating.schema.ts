import * as mongoose from 'mongoose';

export const RatingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth', required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movies', required: true },
  value: { type: Number, required: true, min: 0, max: 5 },
});

export interface Rating extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  movie: mongoose.Types.ObjectId;
  value: number;
}