const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const schoolRoutes = require("./routes/schoolRoutes");
const userRoutes = require("./routes/userRoutes");
const schoolCodeRoutes = require("./routes/schoolCodeRoutes");

dotenv.config();
const app = express();

// ✅ Fix CORS: Allow all methods & necessary headers
app.use(cors({
  origin: "*",  // Allow all origins (Can be restricted to frontend URL)
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "User-Agent"]
}));

// ✅ Body parser for JSON requests
app.use(bodyParser.json());

// ✅ Log incoming requests (for debugging)
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  console.log("Headers:", req.headers);
  next();
});

// ✅ MongoDB Connection
connectDB();

// ✅ Welcome Route
app.get("/", (req, res) => {
  res.send("Welcome to the School Management API!");
});

// ✅ Routes
app.use("/api", schoolCodeRoutes);
app.use("/api/schoolinfo", schoolRoutes);
app.use("/api/users", userRoutes);

// ✅ Set Headers Middleware (Moved before routes)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, User-Agent");
  next();
});

// ✅ Handle Unmatched Routes
app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

// ✅ Start Server
const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
