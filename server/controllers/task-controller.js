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

module.exports = {
  addTask,
  getAllTasks
};
