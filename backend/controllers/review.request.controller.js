/*
Student Name : Manal Magdy
Student ID : B1901825
*/

const db = require("../models");
const Review = db.reviewRequests;

// Create and save a new review
exports.create = (req, res) => {
  // Validate request body
  if (!req.body) {
    return res.status(400).send({ message: "Review content cannot be empty" });
  }

  // Create a new review
  const review = new Review({
    reviewID: req.body.reviewID,
    status: req.body.status,
    supervisorCode: req.body.supervisorCode,
    requestCode: req.body.requestCode,
    remark : req.body.remark ,
  });

  // Save the review in the database
  review.save((err, review) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "An error occurred while creating the review" });
    } else {
      res.send(review);
    }
  });
};

// Retrieve all reviews from the database
exports.findAll = (req, res) => {
  Review.find((err, reviews) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "An error occurred while retrieving reviews" });
    } else {
      res.send(reviews);
    }
  });
};

// Find a single review with the given ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Review.findById(id, (err, review) => {
    if (err) {
      console.error(err);
      if (err.kind === "ObjectId") {
        return res.status(404).send({ message: `Review not found with id ${id}` });
      }
      return res.status(500).send({ message: `Error retrieving review with id ${id}` });
    }

    if (!review) {
      return res.status(404).send({ message: `Review not found with id ${id}` });
    }

    res.send(review);
  });
};

// Update a review identified by the ID in the request
exports.update = (req, res) => {
  const id = req.params.id;

  // Validate request body
  if (!req.body) {
    return res.status(400).send({ message: "Review content cannot be empty" });
  }

  Review.findByIdAndUpdate(
    id,
    {
      reviewID: req.body.reviewID,
      status: req.body.status,
      reason: req.body.reason,
      date: new Date(),
      supervisor: req.body.supervisor,
      request: req.body.request,
    },
    { new: true },
    (err, review) => {
      if (err) {
        console.error(err);
        if (err.kind === "ObjectId") {
          return res.status(404).send({ message: `Review not found with id ${id}` });
        }
        return res.status(500).send({ message: `Error updating review with id ${id}` });
      }

      if (!review) {
        return res.status(404).send({ message: `Review not found with id ${id}` });
      }

      res.send(review);
    }
  );
};



// Delete a Department with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Review.findByIdAndRemove(id)
      .then((data) => {
      if (!data) {
          res.status(404).send({
          message: `Cannot delete Request  with id=${id}. Maybe Request was not found!`,
          });
      } else {
          res.send({
          message: "Request was deleted successfully!",
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
