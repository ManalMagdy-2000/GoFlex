/*
Student Name : Elissa A/P Vassu
Student ID : B2000015
*/

const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  date: { type: String, required: true },
  workLocation: { type: String, required: true },
  workHours: { type: String, required: true },
  workReport: { type: String, required: true },
  supervisorComments: { type: String, required: true },
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
