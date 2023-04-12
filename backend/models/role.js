module.exports = mongoose => {
  var role = mongoose.Schema(
   {
    name: String
  } ,
    { timestamps: true }
  );


  role.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Role = mongoose.model("roles", role);
  return Role;z
}

