/*
Student Name : Manal Magdy Eid Khalil
Student ID : B1901825
*/
const db = require("../models");
const Request = db.requests;
const User = db.users;
// Create a new request
exports.create = (req, res) => {
  const request = new Request({
    workType : req.body.workType ,
    description : req.body.description,
    reason : req.body.reason ,
    date : new Date() ,// system date
    status: 'PENDING',
  });

  request.save((err, request) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      res.send(request);
    }
  });
};

exports.submitRequest = (req, res) => {
  try {
    // Insert or update the document with a potentially duplicate "requestID"
    const request = new Request({
      workType : req.body.workType ,
      description : req.body.description,
      reason : req.body.reason ,
      date : new Date() ,// system date
      status: 'PENDING',
    });

      request.save();
      const id = req.params.id;

      User.findById(id)
          .then((data) => {
          if (!data)
              res.status(404).send({ message: "Not found User with id " + id });
          else {
              data.requests.push(request._id);
              data.save();
              res.send(data);
          }
          }
          )
          .catch((err) => {
          res.status(500)
           .send({ message: "Error retrieving User with id=" + id });
          }
          );

    // Handle the successful insertion or update
    //res.status(200).send(request);
  } catch (error) {
    if (error.code === 11000) {
      // Handle the duplicate key error
      res.status(400).send('Request ID already exists');
    } else {
      // Handle other errors
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }

};
/*
// Create and Save a new Request
exports.submitRequest = (req, res) => {
  const request = new Request({
    //requestID :  "R" + (count + 1),
    workType : req.body.workType ,
    description : req.body.description,
    reason : req.body.reason ,
    date : new Date() ,// system date
    status: 'PENDING',
    //user: req.user._id // Include the user ID in the request object
  });

    request.save();
    const id = req.params.id;
    User.findById(id)
        .then((data) => {
        if (!data)
            res.status(404).send({ message: "Not found Employee with id " + id });
        else {
            data.requests.push(request._id);
            data.save();
            res.send(data);
        }
        }
        )
        .catch((err) => {
        res
            .status(500)
            .send({ message: "Error retrieving User with id=" + id });
        }
        );
};

*/

/*
exports.addUserToRequest = async (req, res) => {
  const request = new Request({
    requestID :  "R" + (count + 1),
    workType : req.body.workType ,
    description : req.body.description,
    reason : req.body.reason ,
    date : new Date() ,// system date
    status: 'PENDING',
    user: req.user._id // Include the user ID in the request object
  });

    request.save();
    const empID = req.params.id;

    User.findById(empID)
        .then((data) => {
        if (!data)
            res.status(404).send({ message: "Not found Employee with id " + empID });
        else {
            data.request.push(request._id);
            data.save();
            res.send(data);
        }
        }
        )
        .catch((err) => {
        res
            .status(500)
            .send({ message: "Error retrieving User with id=" + empID });
        }
        );
};*/

/*
exports.submitRequest = (req, res) => {
  // Validate request
  if (!req.body.workType) {
    res.status(400).send({ message: "Work Type can not be empty  !" });
    return;
  }
        var count = 0;
        Request.find().count().then((data) => {
          count = data;
        }).then (  () =>{
          const request = new Request();
          request.requestID =  "R" + (count + 1);
          request.workType = req.body.workType ;
          request.description = req.body.description;
          request.status = "PENDING";
          request.reason = req.body.reason;
          request.date = new Date(); // system date
          //request.reviewID = req.body.reviewID;
          // Save Request in the database
          request.save();
          const id = req.params.id;

          User.findById(id)
              .then((data) => {
              if (!data)
                  res.status(404).send({ message: "Not found Employee with id " + id });
              else {
                  data.requests.push(request._id);
                  data.save();
                  res.send(data);
              }
              }
              )
              .catch((err) => {
              res
                  .status(500)
                  .send({ message: "Error retrieving User with id=" + id });
              }
              );
  });
};

*/






// Retrieve all Requests from the database.
exports.findAll = (req, res) => {
  // Fetch all data
  Request.find().then(
    reqs=> {
      res.status(200).json({
        //message : "send all Request data",
        allreqs : reqs
      })
    }
  );
 }






// Find a single Request with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Request.findById(id)
        .then((data) => {
        if (!data)
            res.status(404).send({ message: "Not found Request with id " + id });
        else res.send(data);
        }
        )
        .catch((err) => {
        res
            .status(500)
            .send({ message: "Error retrieving Request with id=" + id });
        }
        );
};

// Update a Request by the id in the request
exports.update = (req, res) => {
    if (!req.body.workType && !req.body.description && !req.body.reason) {
        return res.status(400).send({
        message: "Data to update can not be empty!",
        });
    }

    const id = req.params.id;

    Request.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
        if (!data) {
            res.status(404).send({
            message: ` Request with id=${id}  not found!`,
            });
        } else res.send({ message: "Request was updated successfully." });
        }
        )
        .catch((err) => {
        res.status(500).send({
            message: "Error updating Request with id=" + id,
        });
        }
        );
}

// Delete a Request with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Request.findByIdAndRemove(id)
        .then((data) => {
        if (!data) {
            res.status(404).send({
            message: ` Request with id=${id}. not found!`,
            });
        } else {
            res.send({
            message: ` Request was deleted successfully!`
            });
        }
        }
        )
        .catch((err) => {
        res.status(500).send({
            message: "Could not delete Request with id=" + id,
        });
        }
        );
}

// Delete all Requests from the database.
exports.deleteAll = (req, res) => {
  Request.deleteMany({})
        .then((data) => {
        res.send({
            message: `${data.deletedCount} Requests were deleted successfully!`,
        });
        })
        .catch((err) => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all Requests.",
        });
        }
        );
}





