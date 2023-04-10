/*
Student Name : Elissa A/P Vassu
Student ID : B2000015
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  reviewID: { type: String, required: true },
  reviewStatus: { type: String, required: true },
  reason: { type: String },
  reviewDate: { type: String, required: true },
  supervisor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  request: { type: Schema.Types.ObjectId, ref: 'Request', required: true }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
