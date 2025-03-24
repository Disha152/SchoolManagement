const express = require("express");
const School = require("../models/School");

const router = express.Router();

// Add School Information
router.post("/AddSchoolInfo", async (req, res) => {
  try {
    const { code, schoolid, schoolname, applogopath, appbannerpath, paymentlink, sessionDetails } = req.body;
    
    if (!code || !schoolid || !schoolname || !applogopath || !appbannerpath || !paymentlink || !sessionDetails) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }
    
    const existingSchool = await School.findOne({ code });
    if (existingSchool) {
      return res.status(400).json({ success: false, message: "School code already exists." });
    }
    
    const newSchool = new School({ code, schoolid, schoolname, applogopath, appbannerpath, paymentlink, sessionDetails });
    await newSchool.save();
    res.status(201).json({ success: true, message: "School added successfully", data: newSchool });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
});


// Get School Information
router.get("/GetSchoolInfo", async (req, res) => {
  try {
    const { strSchoolCode } = req.query;
    if (!strSchoolCode) {
      return res.status(400).json({ success: false, message: "Missing school code.", data: [], sessionDetails: [] });
    }
    
    const school = await School.findOne({ code: strSchoolCode });
    if (!school) {
      return res.status(404).json({ success: false, message: "School not found.", data: [], sessionDetails: [] });
    }
    
    res.status(200).json({
      success: true,
      message: "School information retrieved successfully",
      data: [{
        schoolid: school.schoolid,
        schoolname: school.schoolname,
        applogopath: school.applogopath,
        appbannerpath: school.appbannerpath,
        paymentlink: school.paymentlink,
      }],
      sessionDetails: school.sessionDetails,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
});

module.exports = router;