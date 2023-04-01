/*
Student Name : Manal Magdy Eid KHalil Eid
Student ID : B1901825
-----------------------------------------------------------------------------------------------------
overall models is the  business logic  - so here I defined Mongoose model for a 'department' collection.
It is defining the fields that the collection will contain (departmentID, name, employees),
and also setting up a toJSON() method which allows us to convert the document into a plain JavaScript object
which can then be manipulated or interacted with by other parts of our code.
Finally, it defines the Department model and returns it so it can be used elsewhere in the application.
*/
module.exports = mongoose => {
  var department = mongoose.Schema(
    {
      departmentID: String,
      name: String,
      //employees: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
      //requests: [{type: mongoose.Schema.Types.ObjectId, ref: 'requests'}]
    },
    { timestamps: true }
  );

  /*department.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });*/

const Department = mongoose.model("Department", department); // we cretaed this var to export  the model from this file
module.exports = Department;
};
