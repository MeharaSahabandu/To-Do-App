const task = require("../models/task-model");

// Adding a new task
const addTask = async (req, res) => {
  const { title, description, status } = req.body;

  const newTask = new task({
    title,
    description,
    status
  });
  try {
    await newTask.save();
    res.json("New Task Added.");
  } catch (error) {
    console.log(error);
    res.status(500).json("Error adding task.");
  }
};

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await task.find();
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error retrieving tasks.");
  }
};

//Delete task
const deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const deletedTask = await task.findByIdAndRemove(taskId);
    if (deletedTask) {
      res.json("Task deleted successfully.");
    } else {
      res.status(404).json("Task not found.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Error deleting task.");
  }
};

module.exports = {
  addTask,
  getAllTasks,
  deleteTask
};
