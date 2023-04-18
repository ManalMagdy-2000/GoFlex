/*
Student Name : Elissa A/P Vassu
Student ID : B2000015
*/
module.exports = app => {
    const reviews = require("../controllers/review.controller.js");

    var router = require("express").Router();

   // add review   ( usecase 3 : Review FWA Request)
    router.post("/:username/:requestID", reviews.submitReviewNew);
  // Retrieve all reviews
  router.get("/getall", reviews.findAll);


    // Add a new review
    router.post("/", reviews.create);

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
