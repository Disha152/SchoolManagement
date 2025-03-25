const express = require("express");
const SchoolCode = require("../models/SchoolCode");

const router = express.Router();

// POST API - Add a school code
router.post("/schools", async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, message: "School code is required" });
    }

    // Check if the code already exists
    const existingSchoolCode = await SchoolCode.findOne({ code });
    if (existingSchoolCode) {
      return res.status(400).json({ success: false, message: "School code already exists" });
    }

    // Save the new school code in MongoDB
    const newSchoolCode = new SchoolCode({ code });
    await newSchoolCode.save();

    res.status(201).json({ success: true, message: "School code added successfully", data: newSchoolCode });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// GET API - Retrieve all school codes
router.get("/schools", async (req, res) => {
  try {
    const schoolCodes = await SchoolCode.find();
    res.status(200).json({ success: true, data: schoolCodes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// GET API - Validate School Code
router.get("/schools/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const schoolCode = await SchoolCode.findOne({ code });

    if (schoolCode) {
      const schoolUrl = 'https://schoolmapping.eduwheels.com/';
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "You have entered a correct school code",
        data: schoolCode,
        url: schoolUrl,
      });
    } else {
      res.status(404).json({
        success: false,
        statusCode: 500,
        message: "You have entered an incorrect school code",
        data: {},
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
