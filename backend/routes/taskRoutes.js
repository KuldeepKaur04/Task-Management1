const express = require("express");
const router = express.Router();

const {
  getTask,
  createTask,
  editTask,
  deleteTask,
} = require("../controllers/TaskController");

router.get("/", getTask);
router.post("/create", createTask);
router.put("/:id", editTask);
router.delete("/:id", deleteTask);

module.exports = router;
