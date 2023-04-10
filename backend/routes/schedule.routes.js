/*
Student Name : Elissa A/P Vassu
Student ID : B2000015
*/

module.exports = app => {
  const schedules = require("../controllers/schedule.controller.js");
  var router = require("express").Router();

  // Create a new schedule
  router.post("/:id/schedule", schedules.create);

  // Retrieve all schedules for a user
  router.get("/:id/schedule", schedules.findAllByUserId);

  // Retrieve a single schedule by ID
  router.get("/schedule/:id", schedules.findOne);

  // Retrieve a single schedule by Iall
  router.get("/schedule", schedules.findAll);

  // Update a schedule by ID
  router.put("/schedule/:id", schedules.update);

  // Delete a schedule by ID
  router.delete("/schedule/:id", schedules.delete);

  app.use("/users", router);
};
