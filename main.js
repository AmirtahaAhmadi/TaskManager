const express = require("express");
const { tasksRouter } = require("./routes/tasks");
const { errorMiddleware } = require("./utils/HandlingErrors");
const app = express();
const PORT = 3000;

app.use("/files", express.static("uploads"));

app.use(express.json());
app.use("/tasks", tasksRouter);

app.use(errorMiddleware);

app.listen(PORT, () => console.log("App Successfully ran!"));
