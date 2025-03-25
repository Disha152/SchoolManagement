const mongoose = require("mongoose");

const schoolCodeSchema = new mongoose.Schema({ 
  code: { type: String, required: true, unique: true },
});

const SchoolCode = mongoose.model("SchoolCode", schoolCodeSchema); 
module.exports = SchoolCode;
