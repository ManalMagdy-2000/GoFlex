/*
Student Name : Manal Magdy Eid Khalil Eid
Student ID :  B1901825
-----------------------------------------------------------------------------------------------------------------
Here I defined a Mongoose Schema for a user object and returning a model from it.
The schema defines the fields that will be present in each user object stored in the database,
 such as their username, password, email, etc.
*/
module.exports = mongoose => {
  var user = mongoose.Schema(
    {
      id: String,
      username: String,
      password: String,
      fullname: String,
      email: String,
      department: {type: mongoose.Schema.Types.ObjectId, ref: 'departments'},
      //reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'reviews'}],
      departmentCode : String,
      supervisorCode : String,
      position: String,
      employeeID: String,
      supervisorID: String,
      requestID : { type : String , ref : "requests"} ,
      token : String ,
      role: String ,
      status : String ,
    },
// timestamps : so any documents created using this schema will have createdAt and updatedAt fields automatically added to them.
    { timestamps: true }
  );
/*
The toJSON function is used for transforming an object into JSON format.
 It also sets the id field to the _id of the object so it can be easily passed around from
 system to system without any compatibility issues.
*/
  user.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("users", user);
  return User;
};
