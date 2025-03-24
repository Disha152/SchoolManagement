const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  schoolId: { type: Number, required: true },
  sessionId: { type: Number, required: true },
  empname: String,
  empcode: String,
  addres: String,
  joindate: String,
  dob: String,
  mobno: String,
  email: String,
  gender: String,
  maritalstatus: String,
  qualification: String,
  imgpath: String,
  aadhar: String,
  classinchg: String,
  sectionid: Number,
  appqrautoaccept: Boolean,
  schoolname: String,
  schoollogo: String,
  usertype: String,
  AttendenceAnalytics: [
    {
      total: Number,
      present: Number,
    },
  ],
  TimeTableAnalytics: [
    {
      totallectures: Number,
    },
  ],
  DueFeesAnalytics: [
    {
      month: String,
      fessdue: Number,
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
