const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnection = require("./config");
const Task = require("./models/taskModel");
const tasks = require("./data");
const taskRoutes = require("./routes/taskRoutes");
dotenv.config();
app.use(express.json());
app.use(cors());

app.listen(3000, async (req, res) => {
  dbConnection();
  // await Task.insertMany(tasks);
  console.log("server is listening..");
});

app.use("/tasks", taskRoutes);
