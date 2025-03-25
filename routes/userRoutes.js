const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET API - Fetch user data based on login credentials
router.get("/LoginWithSchoolId", async (req, res) => {
  try {
    const { userName, password, schoolId, sessionId } = req.query;
    
    const user = await User.findOne({ userName, password, schoolId, sessionId });

    if (!user) {
      return res.status(401).json({
        data: null,
        Icon: null,
        AttendenceAnalytics: null,
        TimeTableAnalytics: null,
        DueFeesAnalytics: null,
        message: "Invalid username or password",
      });
    }

    res.json({
      data: [user],
      Icon: "/path/to/icon", // Adjust as needed
      AttendenceAnalytics: user.AttendenceAnalytics,
      TimeTableAnalytics: user.TimeTableAnalytics,
      DueFeesAnalytics: user.DueFeesAnalytics,
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal index error", error: error.message });
  }
});

// POST API - Create a new user entry
router.post("/LoginWithSchoolId", async (req, res) => {
  try {
    const userData = req.body;

    const existingUser = await User.findOne({
      userName: userData.userName,
      schoolId: userData.schoolId,
      sessionId: userData.sessionId,
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User(userData);
    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
