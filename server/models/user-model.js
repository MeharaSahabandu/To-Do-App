const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required:true
  },
  password: {
    type: Number,
    required: true
  },
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;