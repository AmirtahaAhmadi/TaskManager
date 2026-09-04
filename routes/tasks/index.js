const express = require("express");
const tasksRouter = express.Router();
const validator = require("express-validator");
const { uploader } = require("../../utils/attachments.util");
const taskController = require("../../controllers/TaskController");

tasksRouter.get(
  "/",
  [
    validator
      .query("completed")
      .optional({ checkFalsy: true })
      .isBoolean()
      .withMessage("must be boolean"),
    validator
      .query("search")
      .optional({ checkFalsy: true })
      .isString()
      .isLength({ max: 10 })
      .withMessage("more than 10 character"),
    validator
      .query("page")
      .optional({ checkFalsy: true })
      .toInt()
      .isInt()
      .withMessage("must be intiger"),
    validator
      .query("limit")
      .optional({ checkFalsy: true })
      .toInt()
      .isInt()
      .withMessage("must be intiger"),
  ],
  taskController.getTasks,
);

tasksRouter.post(
  "/",
  [
    validator
      .body("title")
      .notEmpty()
      .withMessage("Please enter the title of task!")
      .isString()
      .withMessage("The title is not string!")
      .isLength({ min: 4, max: 15 })
      .withMessage("The title is less than 4 or more than 15!"),
  ],
  taskController.createTask,
);

tasksRouter.put(
  "/:id",
  [
    validator
      .param("id")
      .notEmpty()
      .withMessage("Please enter the id!")
      .isString()
      .withMessage("Please enter correct id!"),
    validator
      .body("title")
      .isString()
      .withMessage("The title is not string!")
      .isLength({ min: 4, max: 15 })
      .withMessage("The title is less than 4 or more than 15!"),
  ],
  taskController.updateTask,
);

tasksRouter.delete(
  "/:id",
  [
    validator
      .param("id")
      .notEmpty()
      .withMessage("Please enter the id!")
      .isString()
      .withMessage("Please enter correct id!"),
  ],
  taskController.deleteTask,
);

tasksRouter.patch(
  "/:id",
  [
    validator
      .param("id")
      .notEmpty()
      .withMessage("Please enter the id!")
      .isString()
      .withMessage("Please enter correct id!"),
  ],
  taskController.toggleTask,
);

tasksRouter.get(
  "/:id",
  [
    validator
      .param("id")
      .notEmpty()
      .withMessage("Please enter the id!")
      .isString()
      .withMessage("Please enter correct id!"),
  ],
  taskController.getTaskDetail,
);

tasksRouter.post(
  "/:id/attachments",
  uploader.single("attachment"),
  [
    validator
      .param("id")
      .notEmpty()
      .withMessage("Please enter the id!")
      .isString()
      .withMessage("Please enter correct id!"),
  ],
  taskController.addAttachmentToTask,
);

module.exports = { tasksRouter };
