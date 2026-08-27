const express = require("express");
const tasksRouter = express.Router();
const crypto = require("crypto");

let tasks = [
  {
    id: 1,
    title: "first task",
    completed: false,
    createdAt: new Date(),
    attachmentsPath: [],
  },
];

tasksRouter.get("/getTasks", (req, res) => {
  res.status(200).json(tasks);
});

tasksRouter.post("/createTask", (req, res) => {
  const newTaskTitle = req.body.title;
  if (!newTaskTitle) {
    res.status(400).json({ message: "Please enter the title of task!" });
  } else {
    const newTask = {
      id: crypto.randomInt(1000, 99999),
      title: newTaskTitle,
      completed: false,
      createdAt: new Date(),
      attachmentsPath: [],
    };
    tasks.push(newTask);
    res
      .status(201)
      .json({ message: "Task created successfully!", addedData: newTask });
  }
});

tasksRouter.put("/updateTask/:id", (req, res) => {
  const id = req.params.id;
  const newTitle = req.body.title;
  const selectedTask = tasks.find((el) => el.id == id);
  if (!newTitle) {
    res.status(400).json({ message: "please enter the new title of task!" });
  } else {
    if (!selectedTask) {
      res.status(404).json({ message: "There is no task with this id!" });
    } else {
      tasks = tasks.filter((el) => el.id != id);
      const updatedTask = {
        id: parseInt(id),
        title: newTitle,
        completed: selectedTask.completed,
        createdAt: selectedTask.createdAt,
        attachmentsPath: [],
      };
      tasks.push(updatedTask);
      res.status(200).json(updatedTask);
    }
  }
});

tasksRouter.delete("/deleteTask/:id", (req, res) => {
  const id = req.params.id;
  const selectedTask = tasks.find((el) => el.id == id);
  if (!selectedTask) {
    res.status(404).json({ message: "There is no task with this id!" });
  } else {
    tasks = tasks.filter((el) => el.id != id);
    res
      .status(200)
      .json({ message: "Task deleted successfully!", data: tasks });
  }
});

tasksRouter.patch("/toggleTask/:id", (req, res) => {
  const id = req.params.id;
  const selectedTask = tasks.find((el) => el.id == id);
  if (!selectedTask) {
    res.status(404).json({ message: "There is no task with this id!" });
  } else {
    tasks = tasks.filter((el) => el.id != id);
    const checkedTask = {
      id: parseInt(id),
      title: selectedTask.title,
      completed: !selectedTask.completed,
      createdAt: selectedTask.createdAt,
      attachmentsPath: [],
    };
    tasks.push(checkedTask);
    res.status(200).json(checkedTask);
  }
});

tasksRouter.get("/getTaskDetail/:id", (req, res) => {
  const id = req.params.id;
  const selectedTask = tasks.find((el) => el.id == id);
  if (!selectedTask) {
    res.status(404).json({ message: "There is no task with this id!" });
  } else {
    res.status(200).json(selectedTask);
  }
});

module.exports = { tasksRouter };
