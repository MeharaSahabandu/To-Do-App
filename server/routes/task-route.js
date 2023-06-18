const taskRouter = require("express").Router();
const taskController = require("../controllers/task-controller");

taskRouter.post("/api/task/add", taskController.addTask);
taskRouter.get("/api/task/get-all-tasks", taskController.getAllTasks);

module.exports=taskRouter;