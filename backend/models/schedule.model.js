/*
Student Name : Elissa A/P Vassu
Student ID : B2000015
*/

module.exports = mongoose => {
var schedule = mongoose.Schema({
  date: { type: String, required: true },
  workLocation: { type: String, required: true },
  workHours: { type: String, required: true },
  workReport: { type: String, required: true },
  supervisorComments: { type: String },
});

schedule.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Schedule = mongoose.model('Schedule', schedule);
return Schedule;

};
