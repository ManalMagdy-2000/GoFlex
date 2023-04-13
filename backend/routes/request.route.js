/*
Student Name : Manal Magdy Eid Khalil
Student ID : B1901825
*/
module.exports = app => {
  const requests = require("../controllers/request.controller.js");
  var router = require("express").Router();

  // Create a new request
  router.post("/", requests.create);

  // Retrieve all requests
  router.get("/getall", requests.findAll);

  // Retrieve a single request with id
  router.get("/:id", requests.findOne);


  // Update a request with id
  router.put("/:id", requests.update);

  // Delete a request with id
  router.delete("/:id", requests.delete);

  // Delete a all request
  router.delete("/", requests.deleteAll);

  app.use("/api/requests", router);
};
