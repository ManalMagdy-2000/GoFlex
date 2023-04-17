/*
Student Name : Manal Magdy Eid KHalil Eid
Student ID : B1901825
*/
module.exports = mongoose => {
  var request = mongoose.Schema(
    {
      requestID: { type: String},
      workType: { type: String},
      description: { type: String },
      status: { type: String },
      reason: { type: String },
      //user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }, // array of references to User model
      //reviewID : {type : String , ref : "reviews"},
      date: { type: Date, default: Date.now }//system date
    },
    { timestamps: true }
  );

  request.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Request = mongoose.model("requests", request);
  return Request;
};
