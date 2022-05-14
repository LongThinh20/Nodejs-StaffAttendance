const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workTimeSchema = new Schema({
  workSpace: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date
  },
  total: Number,
  overTime: Number,
  annualLeave: Number,
  staffId: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

workTimeSchema.methods.updateTotal = function () {
  let end = moment(this.endTime);
  let now = moment(this.startTime);
  let duration = moment.duration(end.diff(now));
  let days = duration.asHours();

  this.total = days;
  this.save();
};

module.exports = mongoose.model("WorkTime", workTimeSchema);
