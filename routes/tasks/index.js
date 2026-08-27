const express = require("express");
const tasksRouter = express.Router();
const { uploader } = require("../../utils/attachments.util");
const taskController = require("../../TaskController");

tasksRouter.get("/getTasks", taskController.getTasks);

tasksRouter.post("/createTask", taskController.createTask);

tasksRouter.put("/updateTask/:id", taskController.updateTask);

tasksRouter.delete("/deleteTask/:id", taskController.deleteTask);

tasksRouter.patch("/toggleTask/:id", taskController.toggleTask);

tasksRouter.get("/getTaskDetail/:id", taskController.getTaskDetail);

tasksRouter.post(
  "/addAttachmentToTask/:id",
  uploader.single("attachment"),
  taskController.addAttachmentToTask,
);

module.exports = { tasksRouter };
