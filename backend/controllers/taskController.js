const Task = require("../models/taskModel");
const mongoose = require("mongoose")


// functions


// create one task
const  createTask =  async (req,res) => {
        // important property of request 
        // It is in ' req.body '  -> the data that is send with request
     
         // saving data to our data base using .create()
     
         try{
           const task = await Task.create(req.body)     // .create() will store data on Database
           res.status(200).json(task)
        }
     
         catch(err){
           res.status(500).json({msg :err.message})
         }
     }



//GEt all tasks
const getAllTasks =async (req,res)=> {
    try{
      const tasks = await Task.find();    //all data
      res.status(200).json(tasks);        //send the found data as json
    }
    catch(err){
         res.status(500).json({msg :err.message})
    }
 }



// get one task      //   to get a single task we require its " id "     
// But what if the 'id' do not existS(may be the task is deleted)  ->  then findById will not return a true value 
 const getTask = async (req,res)=>{
    
    try{
        // destructuring the id 
        const { id } = req.params            // while the param is set after a colon in the url 
        // while making a request do " not add a colon with the id "" 

        const task = await Task.findById(id);

        //if task not found  ->  404 => NOT FOUND
        if(!task)
        {
            return res.status(404).json(`No task with id : ${id}`)
        }
        res.status(200).json(task)
    }
    catch(err){
        res.status(500).json({msg :err.message})
    }
 }



// DELETE A TASK   ->    require the id for deletion also check if id exist or not 
const deleteTask = async(req,res) => {
  try{
    const {id} = req.params;
    //finding by id and then deleting
    const task = await Task.findByIdAndDelete(id);     // # add await in order to bypass errors

    //if task not found  ->  404 => NOT FOUND
    if(!task)
    {
        return res.status(404).json(`No task with id : ${id}`)
    }
    
    res.status(200).send("task Deleted")
  }
  catch(err){
    res.status(500).json({msg :err.message})
 }
}



// Update Task
// NOTE -> whenever u r updating a task the validation that you had set went off(overWrite)
// # USE 'PATCH' generally instead of Put since we may have many fileds in our project t
// for Applying validation to updation also set 'Runvalidators' as true in the third parameter of findById and Update
const updateTask = async ( req,res) =>{
    try{
        const {id} = req.params;
        //use find by id and update
        //the information to be set as new updated data is send to backend via req.body
        const task = await Task.findByIdAndUpdate({_id:id}, req.body ,{
                new : true,
                runValidators : true
        });      
         // 'new' is an object to specify that this is a new entry
        //if task not found  ->  404 => NOT FOUND
    if(!task)
    {
        return res.status(404).json(`No task with id : ${id}`)
    }

        res.status(200).json(task) ;  // to see what data is updated
    }
    catch(err){
        res.status(500).json({msg :err.message})
     }
}




module.exports={
    createTask,
    getAllTasks,
    getTask,
    deleteTask,
    updateTask,
}