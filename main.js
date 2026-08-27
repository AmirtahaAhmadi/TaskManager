const express = require("express");
const { tasksRouter } = require("./routes/tasks");
const app = express();
const PORT = 3000;

app.use("/files", express.static("uploads"));

app.use(express.json());
app.use("/tasks", tasksRouter);

app.listen(PORT, () => console.log("App Successfully runned!"));
