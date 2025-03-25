
const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  start: { type: String, required: true },
  enddate: { type: String, required: true },
  isactive: { type: Boolean, required: true },
});

const schoolSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  schoolid: { type: Number, required: true },
  schoolname: { type: String, required: true },
  applogopath: { type: String, required: true },
  appbannerpath: { type: String, required: true },
  paymentlink: { type: String, required: true },
  sessionDetails: [sessionSchema],
});

const School = mongoose.model("School", schoolSchema);
module.exports = School;
