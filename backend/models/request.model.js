/*
Student Name : Manal Magdy Eid KHalil Eid
Student ID : B1901825
*/
module.exports = mongoose => {
  var request = mongoose.Schema(
    {
      requestID: {type : String , required : true },
      description:  {type : String , required : true },
      date:  {type : String , required : true },
      status:  {type : String , required : true },
      reviewID : {type : String , ref : "reviews"},
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
