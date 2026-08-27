const crypto = require("crypto");
const fs = require("fs");

const readingData = () => {
  const tasks = JSON.parse(fs.readFileSync("data.json", "utf-8"));
  return tasks;
};

const changingTasks = (newData) => {
  fs.writeFileSync("data.json", JSON.stringify(newData));
};

const getTasks = (req, res) => {
  let tasks = readingData();
  const completed = req.query.completed;
  const search = req.query.search;
  const page = req.query.page;
  const limit = req.query.limit;
  if (completed) {
    if (completed !== "true" && completed !== "false") {
      return res
        .status(400)
        .json({ message: "Completed query must be boolean!" });
    } else {
      tasks = tasks.filter((el) => String(el.completed) == completed);
    }
  }
  if (search) {
    tasks = tasks.filter((el) => el.title.includes(search));
  }
  if (limit) {
    if (isNaN(Number(limit))) {
      return res.status(400).json({ message: "Limit query must be number!" });
    } else {
      if (page) {
        if (isNaN(Number(page))) {
          return res
            .status(400)
            .json({ message: "Page query must be number!" });
        } else {
          const skip = (page - 1) * limit;
          const lastIndex = page * limit;
          tasks = tasks.slice(skip, lastIndex);
        }
      } else {
        tasks = tasks.slice(0, limit);
      }
    }
  }
  res.status(200).json(tasks);
};

const createTask = (req, res) => {
  let tasks = readingData();
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
    changingTasks(tasks);
    res
      .status(201)
      .json({ message: "Task created successfully!", addedData: newTask });
  }
};

const updateTask = (req, res) => {
  let tasks = readingData();
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
        attachmentsPath: selectedTask.attachmentsPath,
      };
      tasks.push(updatedTask);
      changingTasks(tasks);
      res.status(200).json(updatedTask);
    }
  }
};

const deleteTask = (req, res) => {
  let tasks = readingData();
  const id = req.params.id;
  const selectedTask = tasks.find((el) => el.id == id);
  if (!selectedTask) {
    res.status(404).json({ message: "There is no task with this id!" });
  } else {
    tasks = tasks.filter((el) => el.id != id);
    changingTasks(tasks);
    res
      .status(200)
      .json({ message: "Task deleted successfully!", data: tasks });
  }
};

const toggleTask = (req, res) => {
  let tasks = readingData();
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
      attachmentsPath: selectedTask.attachmentsPath,
    };
    tasks.push(checkedTask);
    changingTasks(tasks);
    res.status(200).json(checkedTask);
  }
};

const getTaskDetail = (req, res) => {
  let tasks = readingData();
  const id = req.params.id;
  const selectedTask = tasks.find((el) => el.id == id);
  if (!selectedTask) {
    res.status(404).json({ message: "There is no task with this id!" });
  } else {
    res.status(200).json(selectedTask);
  }
};

const addAttachmentToTask = (req, res) => {
  let tasks = readingData();
  const id = req.params.id;
  const file = req.file;
  const selectedTask = tasks.find((el) => el.id == id);
  if (!selectedTask) {
    res.status(404).json({ message: "There is no task with this id!" });
  } else {
    tasks = tasks.filter((el) => el.id != id);
    const updatedTask = {
      id: parseInt(id),
      title: selectedTask.title,
      completed: selectedTask.completed,
      createdAt: selectedTask.createdAt,
      attachmentsPath: [
        ...selectedTask.attachmentsPath,
        `files/${file.filename}`,
      ],
    };
    tasks.push(updatedTask);
    changingTasks(tasks);
    res.status(201).json(updatedTask);
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
  getTaskDetail,
  addAttachmentToTask,
};
