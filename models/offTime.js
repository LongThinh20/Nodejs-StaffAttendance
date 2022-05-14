const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const offTimeSchema = new Schema({
  offTime: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  offHours: {
    type: String,
    required: true
  },
  staffId: {
    type: Schema.Types.ObjectId,
    ref: "Staff",
    require: true
  }
});

module.exports = mongoose.model("OffTime", offTimeSchema);
