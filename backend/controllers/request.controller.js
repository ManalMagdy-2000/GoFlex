/*
Student Name : Manal Magdy Eid Khalil
Student ID : B1901825
*/
const db = require("../models");
const Request = db.requests;
// Create and Save a new Request
exports.create = (req, res) => {
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
          request.status = req.body.status;
          request.date = new Date(); // system date
          //request.reviewID = req.body.reviewID;
          // Save Request in the database
      request
      .save(request)
      .then((data) => {
        res.send(data);
      }
          )
      .catch((err) => {
        res.status(500).send({
        message: err.message || "Some error occurred while creating the Request.",
      });
    });
  });
};






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
    if (!req.body.workType && !req.body.description) {
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





