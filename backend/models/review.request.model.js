/*
Student Name : Manal Magdy Eid KHalil Eid
Student ID : B1901825
*/
module.exports = mongoose => {
  var review = mongoose.Schema(
    {
      reviewID: { type: String, required: true },
      status: { type: String, required: true },
      remark: { type: String, required: true },
      requestCode : { type: String, required: true  , ref : 'requests'},
      supervisorCode : { type: String, required: true  , ref : 'users'},
    },
    { timestamps: true }
  );

  review.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Request = mongoose.model("reviews", review);
  return Request;
};
