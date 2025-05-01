const Task = require("../models/taskModel");
const mongoose = require("mongoose");

const getTask = async (req, res) => {
  try {
    const allTasks = await Task.find();
    res.status(200).json({ success: true, message: allTasks });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

const createTask = async (req, res) => {
  try {
    let { name, description } = req.body;
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json({ message: "task added", newTask });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const editTask = async (req, res) => {
  let { id } = req.params;
  let task = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, task, { new: true });
    res.status(200).json({ success: true, updatedTask });
  } catch (error) {
    res.status(500).json({ success: false, message: "server Error" });
  }
};

const deleteTask = async (req, res) => {
  let { id } = req.params;
  try {
    let deletedTask = await Task.findByIdAndDelete(id);
    res.status(200).json({ deletedTask: deletedTask });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { getTask, createTask, editTask, deleteTask };
