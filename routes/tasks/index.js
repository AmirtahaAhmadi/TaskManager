const express = require("express");
const tasksRouter = express.Router();
const { uploader } = require("../../utils/attachments.util");
const taskController = require("../../controllers/TaskController");

tasksRouter.get("/", taskController.getTasks);

tasksRouter.post("/", taskController.createTask);

tasksRouter.put("/:id", taskController.updateTask);

tasksRouter.delete("/:id", taskController.deleteTask);

tasksRouter.patch("/:id", taskController.toggleTask);

tasksRouter.get("/:id", taskController.getTaskDetail);

tasksRouter.post(
  "/:id/attachments",
  uploader.single("attachment"),
  taskController.addAttachmentToTask,
);

module.exports = { tasksRouter };
