/*
Student Name : Elissa A/P Vassu   Student ID : B2000015
Student Name : Manal Magdy   , Student ID : BI1901825

*/

module.exports = mongoose => {
var review =   mongoose.Schema({
  reviewID: { type: String, required: true },
  status: { type: String, required: true },
  remark: { type: String },
  date: { type: String, required: true },
  supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  request: { type: mongoose.Schema.Types.ObjectId, ref: 'Request', required: true }
});

review.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Review = mongoose.model('Review', review);

return Review;
}
