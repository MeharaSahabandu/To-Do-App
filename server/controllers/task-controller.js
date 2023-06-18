const task=require("../models/task-model");

//adding new task
const addTask= async((req, res)=>{
    const{
        title,
        description,
        status
    }=req.body;

    const newTask = new task({
        title,
        description,
        status
    });

    newTask.save().then(()=>{
        res.json("New Task Added .. ");
    }).catch((error)=>{
        console.log("error");
    });
})

//get all tasks
const getAllTasks= async((req, res)=>{
    task.find().then((task)=>{
        res.json(task);
    }).catch((error)=>{
        console.log("error");
    })
})

exports.addTask=addTask;
exports.getAllTasks=getAllTasks;