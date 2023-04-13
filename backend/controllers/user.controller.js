/*
Student Name : Manal Magdy Eid Khalil
Student ID : B1901825
*/
const db = require("../models");
const User = db.users;
const Request = db.requests;

//hard coded data for HR Admin
const HRAdmin = new User({
  username: "admin",
  email: "admin@support.com",
  password: "admin",
  fullname: "HR Admin",
  role: "HRAdmin",
  departmentCode: "none",
  position: "Manager",
  status: "Active"
});
 HRAdmin.save(HRAdmin);



// Create and Save a new User
exports.create = (req, res) => {

  console.log("dep code", req.body.departmentCode)
  console.log("sup code", req.body.supervisorCode)
  // Validate request
  if (!req.body.username) {
    res.status(400).send({ message: "username  can not be empty!" });
    return;
  }
  //check if user exists
    User.findOne
    ({username : req.body.username})
    .then(user => {
      if (user) {
         res.status(400).send({
         message: "User already exists.",
            });
        }
        else {

            //create a user
            console.log("add user to dep CODE " ,req.params.departmentCode );
            console.log("add user to sup CODE " ,req.params.supervisorCode );
              db.departments.findById(req.params.departmentID)
                  .then((data) => {
                    var count = 0;
                    User.find().count().then((data) => {
                      count = data;
                    }).then( () => {
                     /*
                      const request = Request.findOne({ requestID: req.body.requestID });
                      if (!request) {
                        return res.status(404).json({ message: 'Request not found' });
                      }
                      */
                      const user = new User();
                      //user.employeeID =  "U" + (count + 1);
                      user.username= req.body.username;
                      user.email= req.body.email;
                      user.password= req.body.password;
                      user.fullname= req.body.fullname;
                      user.role=req.body.role;
                      if(user.role == "Employee" ){
                        user.employeeID =  "E" + (count + 1);
                        user.supervisorCode= req.body.supervisorCode;
                       // request =request._id // assign the request object to the request field in the new user object

                      }
                      else if (user.role == "User"){
                          user.employeeID =  "S" + (count + 1);
                      }

                      //user.department= "642f07f1e3614e7e317bcb67"; //fixed dept
                      user.departmentCode = req.body.departmentCode;
                      user.position= req.body.position;
                      user.status= req.body.status;
                      //user.supervisorID = req.body.supervisorID;
                      // token= req.body.token;

                      //save user in database
                      user
                      .save(user)
                      .then((data) => {
                        console.log("user created", data);
                        res.send(data);
                      })
                      .catch((err) => {
                        res.status(500).send({
                          message: err.message || "Some error occurred while creating the User.",
                        });
                      });

                    })
                  }
                  )
                  .catch((err) => {
                    res.status(500).send({
                    message: err.message || "Some error occurred while creating the Department.",
                  });
            });

        }
    });
};



//authenticate
exports.authenticate = (req, res) => {
    console.log(req.body);
    User.findOne({ username: req.body.username })
      .then(user => {
        if (!user) {
          res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
        } else {

          // check if password matches
          if (user.password === req.body.password) {
            // if user is found and password is right create a token
            var token = user.token;
            res.setHeader('Authorization', 'Bearer ' + token);

            //return user without password
            user.password = undefined;
            res.json(user);
          } else {
            res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
          }
        }
      })
      .catch(err => {
        res.status(500).send({ success: false, msg: 'Error authenticating user.' });
      });
  };

//get current user
exports.getCurrentUser = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    if (token) {
        User.findById("6373738136d3037d345f7fff").then((user) => {
            res.json({success: true, msg: 'Welcome in the member area ' + user.username + '!'});
             }).catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving users.",
                });
            });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  // Fetch all data
  User.find().then(
    users=> {
      res.status(200).json({
        //message : "send all users data",
        allusers : users
      })
      //console.log(users);
    }
  );
 }



 exports.addSupervisor = (req, res) => {
  console.log("add emp ..");
    db.users.create(req).then((user) => {
        db.users.findById(req.params.id).then((sup) => {
            user.sup = sup._id;
            user.position = req.body.position;
            sup.employees.push(user._id);
            sup.save();
            res.send(user);
        });
    }
    ).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while adding employee to department.",
        });
    });
};


// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findById(id)
        .then((data) => {
        if (!data)
            res.status(404).send({ message: "Not found User with id " + id });
        else res.send(data);
        }
        )
        .catch((err) => {
        res
            .status(500)
            .send({ message: "Error retrieving User with id=" + id });
        }
        );
    };

// Update a User by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
        message: "Data to update can not be empty!",
        });
    }

    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
        if (!data) {
            res.status(404).send({
            message: `Cannot update User with id=${id}. Maybe User was not found!`,
            });
        } else res.send({ message: "User was updated successfully." });
        })
        .catch((err) => {
        res.status(500).send({
            message: "Error updating User with id=" + id,
        });
        });
    }

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id)
        .then((data) => {
        if (!data) {
            res.status(404).send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`,
            });
        } else {
            res.send({
            message: "User was deleted successfully!",
            });
        }
        })
        .catch((err) => {
        res.status(500).send({
            message: "Could not delete User with id=" + id,
        });
        });
    }

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.deleteMany({})
        .then((data) => {
        res.send({
            message: `${data.deletedCount} Users were deleted successfully!`,
        });
        })
        .catch((err) => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all users.",
        });
        });
    }







