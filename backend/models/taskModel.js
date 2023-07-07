const mongoose = require("mongoose");

// since 'Schema' is a method within mongoose, it starts with a Capital letter
// similarly 'Router' is a method in express to make routes

const taskSchema = mongoose.Schema (
    {
        name:{
            type:String,
            required:[true, "Please add a task"],  // if user didn't entered a task message will be displayed
        },
        completed:{
            type:Boolean,
            default:false,
            required:true,
        }
    },
    
    {
      timestamps:true
    }
);


// model for our schema
// the name of our model will be "Task" and it will follow the structure of "taskSchema"

const Task = mongoose.model("Task",taskSchema);

// # A sub-folder named 'tasks' bcoz of model 'Task' will be created in database itself and in this folder all the tasks will be stored

// now we can access our Database using 'Task' varaible

module.exports = Task;