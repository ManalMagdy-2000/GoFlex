/*
Student Name : Elissa A/P Vassu
Student ID : B2000015
*/

const Schedule = require("../models/schedule.model");

// Create a new schedule
exports.create = (req, res) => {
  const schedule = new Schedule({
    date: req.body.date,
    workLocation: req.body.workLocation,
    workHours: req.body.workHours,
    workReport: req.body.workReport,
    supervisorComments: req.body.supervisorComments,
  });

  schedule.save((err, schedule) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      res.send(schedule);
    }
  });
};

// Retrieve all schedules
exports.findAll = (req, res) => {
  Schedule.find({}, (err, schedules) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      res.send(schedules);
    }
  });
};

// Retrieve a single schedule by id
exports.findOne = (req, res) => {
  Schedule.findById(req.params.id, (err, schedule) => {
    if (err) {
      res.status(500).send({ message: err });
    } else if (!schedule) {
      res.status(404).send({ message: "Schedule not found" });
    } else {
      res.send(schedule);
    }
  });
};

// Update a schedule by id
exports.update = (req, res) => {
  Schedule.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, schedule) => {
      if (err) {
        res.status(500).send({ message: err });
      } else if (!schedule) {
        res.status(404).send({ message: "Schedule not found" });
      } else {
        res.send(schedule);
      }
    }
  );
};

// Delete a schedule by id
exports.delete = (req, res) => {
  Schedule.findByIdAndRemove(req.params.id, (err, schedule) => {
    if (err) {
      res.status(500).send({ message: err });
    } else if (!schedule) {
      res.status(404).send({ message: "Schedule not found" });
    } else {
      res.send({ message: "Schedule deleted successfully" });
    }
  });
};

// Delete all schedules
exports.deleteAll = (req, res) => {
  Schedule.deleteMany({}, (err) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      res.send({ message: "All schedules deleted successfully" });
    }
  });
};
