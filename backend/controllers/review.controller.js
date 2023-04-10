/*
Student Name : Elissa A/P Vaasu
Student ID : B2000015
*/

const Review = require("../models/review.model.js");

// Create and save a new review
exports.create = (req, res) => {
  // Validate request body
  if (!req.body) {
    return res.status(400).send({ message: "Review content cannot be empty" });
  }

  // Create a new review
  const review = new Review({
    reviewID: req.body.reviewID,
    reviewStatus: req.body.reviewStatus,
    reason: req.body.reason,
    reviewDate: req.body.reviewDate,
    supervisor: req.body.supervisor,
    request: req.body.request,
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
      reviewStatus: req.body.reviewStatus,
      reason: req.body.reason,
      reviewDate: req.body.reviewDate,
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

// Delete a review with the specified ID in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Review.findByIdAndRemove(id, (err, review) => {
    if (err) {
      console.error(err);
      if (err.kind === "ObjectId") {
        return res.status(404).send({ message: `Review not found with id ${id}` });
