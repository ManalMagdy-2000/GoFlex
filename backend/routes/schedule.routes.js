/*
Student Name : Elissa A/P Vassu
Student ID : B2000015
*/

module.exports = app => {
  const schedules = require("../controllers/schedule.controller.js");
  var router = require("express").Router();

  // Create a new schedule
  router.post("/:id", schedules.addSchedule);

  // Retrieve a single schedule by ID
  router.get("/schedule/:id", schedules.findOne);

  // Retrieve a single schedule by Iall
  router.get("/schedule", schedules.findAll);

  // Update a schedule by ID
  router.put("/schedule/:id", schedules.update);

  // get all schedules by user id
  router.get("/user/:id", schedules.findAllByUserId);

  app.use("/api/schedule", router);
};
