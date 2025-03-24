const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const schoolRoutes = require("./routes/schoolRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
    res.send("Welcome to the School Management API!");
  });
  

// Routes
app.use("/api/schools", schoolRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
