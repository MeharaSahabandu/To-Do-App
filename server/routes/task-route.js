const taskRouter = require("express").Router();
const taskController = require("../controllers/task-controller");

taskRouter.post("/api/task/add-task", taskController.addTask);
taskRouter.get("/api/task/get-all-tasks", taskController.getAllTasks);
taskRouter.delete("/api/delete-task/:id", taskController.deleteTask);

module.exports = taskRouter;
