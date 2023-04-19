/*
Student Name : Elissa A/P Vassu
Student ID : B2000015
*/

const db = require("../models");
const User = db.users;
const Schedule = db.schedules;

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

exports.addSchedule = (req, res) => {
  const schedule = new Schedule({
    date: req.body.date,
    workLocation: req.body.workLocation,
    workHours: req.body.workHours,
    workReport: req.body.workReport,
    supervisorComments: req.body.supervisorComments,
  });

  schedule.save();
  const id = req.params.id;

  User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else {
        data.schedules.push(schedule._id);
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

// Retrieve all schedules
exports.findAll = (req, res) => {
  Schedule.find({}).then((data) => {
    res.send(data);
  }
  ).catch((err) => {
    res.status(500).send({ message: err });
  });
};

// Retrieve a single schedule by id
exports.findOne = (req, res) => {
  Schedule.findById(req.params.id).then((data) => {
    if (!data) {
      res.status(404).send({ message: "Schedule not found" });
    } else {
      res.send(data);
    }
  }
  ).catch((err) => {
    res.status(500).send({ message: err });
  });
};

exports.findAllByUserId = (req, res) => {
  User.findById(req.params.id).then((data) => {
    if (!data) {
      res.status(404).send({ message: "Schedule not found" });
    } else {
      var schedules = data.schedules;
      Schedule.find({ _id: { $in: schedules } }).then((data) => {
        res.send(data);
      }
      ).catch((err) => {
        res.status(500).send({ message: err });
      });
    }
  }
  ).catch((err) => {
    res.status(500).send({ message: err });
  });
};
// Update a schedule by id
exports.update = (req, res) => {
  Schedule.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }).then((data) => {
      if (!data) {
        res.status(404).send({ message: "Schedule not found" });
      } else {
        res.send(data);
      }
    }
  ).catch((err) => {
    res.status(500).send({ message: err });
  });
};
