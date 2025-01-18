require("dotenv").config();
const cors = require('cors');
const express = require("express");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

const app = express(); // exp App
const mongoose = require("mongoose");
const port = process.env.PORT || 4000; // 4000
app.use(cors());

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(cors());

app.get("/", (req, res) => {
  res.json("Welcome");
});
// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.DATA_BASE)
  .then(() => {
    // listen to port
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
