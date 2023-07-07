const express = require ("express");
const Task = require("../models/taskModel");
//import functions from controllers
const { getAllTasks, createTask, getTask, deleteTask, updateTask } = require("../controllers/taskController");

// define Router -> its an method attached to express





const router = express.Router()
// change  app  to  router





//CREATE(saving) A TASK 
router.post("/", createTask)

// Get/Read  all Data form Database
router.get("/", getAllTasks)

// get single task
// we are gonna use PARAMS  ' :id '
router.get("/:id", getTask)     // do not add the : 'colon' while making the request before id

//Delete Task  -> .delete() is also a kind of request
router.delete("/:id", deleteTask)


// Update Task  ->  can use   'put'  or  'patch'   both to Update a Task
// PUT VS PATCH
// PUT -> need to specify every field of a model in order to update a task (both name and completed)
// PATCH -> no need to specify every field of model. At least one field required and can be updated. Can just update name or Completed
// Patch is preferred in using
router.patch("/:id", updateTask);


// REFARCTOR OUR ROUTES  -> SINCE THE END POINT OF EACH REQUEST IS SAME WE MAY COMPRESS IT FURTHER
   // TO DO THIS -> JUST SPECIFY THE COMMON ROUTE IN APP.USE FOR THE TASKROUTES 
 // also remodify the path of url in above fucntions




 
module.exports = router