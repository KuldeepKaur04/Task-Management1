const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const tasks = [
  {
    name: "Create Login Page",
    description:
      "Design and implement a responsive login page using HTML, CSS, and JavaScript with input validation and error handling.",
  },
  {
    name: "Set Up MongoDB Database",
    description:
      "Initialize a MongoDB database for the application, define the schema for user and book collections, and establish a connection using Mongoose.",
  },
];

app.listen(3000, (req, res) => {
  console.log("server is listening..");
});

app.get("/tasks", (req, res) => {
  try {
    res.status(200).json(tasks);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/tasks/create", (req, res) => {
  let { name, description } = req.body;
  if (!name || !description) {
    return res
      .status(400)
      .json({ message: "Both name and description are required." });
  }
  try {
    tasks.push(req.body);
    res.status(201).json({ message: "task added", tasks });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.put("/tasks/:id", (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let { name, description } = req.body;
    tasks[id] = req.body;
    res.status(200).json({ task: tasks[id] });
  } catch (err) {
    res.status(404).json({ message: "something went wrong" });
  }
});

app.delete("/tasks/:id", (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let deletedTask = tasks.splice(id, 1);
    res.status(200).json({ tasks: tasks, deletedTask: deletedTask });
  } catch (err) {
    res.send(err);
  }
});
