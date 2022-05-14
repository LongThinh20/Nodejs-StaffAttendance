const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

const staffSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  user: String,
  password: String,
  role: String,
  doB: {
    type: Date,
    required: true
  },
  salaryScale: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  annualLeave: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  isConfirm: [
    {
      confirmed: { type: Boolean },
      month: { type: Number }
    }
  ],
  workTime: [
    {
      workSpace: {
        type: String
      },
      startTime: {
        type: Date
      },
      endTime: {
        type: Date
      },
      total: Number,
      overTime: Number
    }
  ],
  offTime: [
    {
      offTime: {
        type: String
      },
      reason: {
        type: String
      },
      offHours: {
        type: Number
      }
    }
  ],
  covidInfo: {
    vaccineInfo: [
      {
        name: String,
        date: Date
      }
    ],
    infectedInfo: [{ infectedDate: Date, cureDate: Date }],
    temperatureInfo: [
      {
        temperature: Number,
        time: Date
      }
    ]
  }
});

staffSchema.methods.addOffTime = function (offTimes) {
  const { offTime, reason, offHours } = offTimes;
  // let timesDatePicker = offTime.split(",").length - 1 + 1;
  const updateOffTime = [...this.offTime];
  //update annual Leave
  let dayLeave = offHours / 8;
  this.annualLeave = this.annualLeave - dayLeave;
  updateOffTime.push(offTimes);
  this.offTime = updateOffTime;
  return this.save();
};

staffSchema.methods.addWorkTime = function (startWorkTime) {
  const updateWorkTime = [...this.workTime];

  updateWorkTime.push(startWorkTime);

  this.workTime = updateWorkTime;

  return this.save();
};

staffSchema.methods.updateWorkTime = function (endTime) {
  const lastWorkTime = this.workTime[this.workTime.length - 1];
  if (lastWorkTime.endTime === null) {
    lastWorkTime.endTime = endTime;
    let end = moment(lastWorkTime.endTime);
    let start = moment(lastWorkTime.startTime);
    let duration = moment.duration(end.diff(start));
    let times = duration.asHours();

    if (times > 8) {
      lastWorkTime.overTime = times - 8;
    }
    lastWorkTime.total = times;

    this.workTime[this.workTime.length - 1] = lastWorkTime;

    return this.save();
  }
  return this.save();
};

staffSchema.methods.updateVaccineInfo = function (vaccine1, vaccine2) {
  const updateVaccinInfo = [...this.covidInfo.vaccineInfo];
  updateVaccinInfo.push(vaccine1);
  updateVaccinInfo.push(vaccine2);
  this.covidInfo.vaccineInfo = updateVaccinInfo;

  console.log(this.covidInfo.vaccineInfo);

  return this.save();
};

module.exports = mongoose.model("Staff", staffSchema);
