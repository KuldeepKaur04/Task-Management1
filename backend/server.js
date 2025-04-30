const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnection = require("./config");
const Task = require("./models/taskModel");
const tasks = require("./data");
dotenv.config();
app.use(express.json());
app.use(cors());

app.listen(3000, async (req, res) => {
  dbConnection();

  // await Task.insertMany(tasks);
  console.log("server is listening..");
});

app.get("/tasks", async (req, res) => {
  try {
    const allTasks = await Task.find();
    res.status(200).json({ success: true, message: allTasks });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
});

app.post("/tasks/create", async (req, res) => {
  try {
    let { name, description } = req.body;
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json({ message: "task added", newTask });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.put("/tasks/:id", async (req, res) => {
  let { id } = req.params;
  let task = req.body;
  try {
    const updatedBook = await Task.findByIdAndUpdate(id, task, { new: true });
    res.status(200).json({ success: true, message: updatedBook });
  } catch (error) {
    res.status(500).json({ success: false, message: "server Error" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let deletedTask = await Task.findByIdAndDelete(id);
    res.status(200).json({ deletedTask: deletedTask });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
