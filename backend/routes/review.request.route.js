/*
Student Name : Manal Magdy
Student ID : B1901825
*/
module.exports = app => {
  const reviews = require("../controllers/review.request.controller.js");

  var router = require("express").Router();

  // Add a new review
  router.post("/:supervisorID/request/:requestID/review", reviews.create);

  // Retrieve all reviews
  router.get("/", reviews.findAll);

  // Retrieve a single review with id
  router.get("/:id", reviews.findOne);

  // Update a review with id
  router.put("/:id", reviews.update);

  // Delete a review with id
  router.delete("/:id", reviews.delete);

  app.use("/api/review", router);
};


