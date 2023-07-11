const dotenv = require("dotenv").config();    // remember to config dotenv 
const express = require ("express");
const connecDb =require("./config/connecDb");
// for using .env file -> we require dotenv npm package
 // remember to config dotenv 
const mongoose = require("mongoose");

// import the moonse Task variable for accessing the Database
const Task = require("./models/taskModel");
// import the functions
const { createTask, getAllTasks } = require("./controllers/taskController");

const taskRoutes = require("./routes/taskRoute.js")
// use this taskRoute as middleawre also using .use()

//CORS
const cors = require('cors')





//express app
const app = express()




// MiddleWare     ->      for not getting Undedined for json and encoded form body of request

//MiddleWare functions have access to the .get and .post objects 
// like the #  " req, res and next "
// a middleWare is just any function passed as the second argument in the route

//after the middleWare function's part end THE 'next' fcuntion is used to give control to the callback functioon 
// as the third argument in the routing part

        //   ****** eg: run the below code *******

// const logger = (req,res,next) => {
//     console.log("MiddleWare ran");
//     next();
// }

// app.get("/",logger, (req,res) => {
//     res.send("HomePage")
// });



//CORS for the ERROR b/w backend and frontend
app.use(cors(
    // { // // enter the url of frontend in 'origin' property
    // origin: ["http://localhost:3000/"]
    // // making the url Array since we may deploy our frontend to any other platform eg. heroku 
    // // for using backend from any place on internet don't add origin just do -> app.use(cors())} 
    { 
        origin: ["http://localhost:4000/", "https://mern-task-app.onrender.com"]
    }
    ))


    
// middleWares to remove the undefined Problem with postman requests
app.use(express.json()) ;              
// removes the problem with json as body not consoling 
app.use(express.urlencoded({extended:false}))

//use taskRoutes to fire the taskRoutes.js file
app.use("/api/v1/tasks",taskRoutes)   // in order to fire the taskRoute.js file -> use it as middleWare
// the first parameter is the common Path all routes have 







// User Routes
app.get("/", (req,res) => {
    res.send("HomePage")
});


//CREATE(saving) A TASK to database
app.post("/api/v1/tasks", createTask);


// Get/Read Data form Database
app.get("/api/v1/tasks", getAllTasks)





// the first parameter is port no. but since we are making it on " Heroku " server 
// we need not to specify port. The Heroku server will provide us the Port no. itself
// use .env file for this work

const PORT = process.env.PORT || 4000;


// we will use mongoose to connect to mongoDb 

const startServer = async()=>{
    try{
        await connecDb();   // wait for the connection with mongoDb then only fire the server 
        // !!!! connect the server first before fire to reduce error
        app.listen(PORT, ()=>{
         console.log(`Server running on Port ${PORT}`);
        });
    }
    catch(err){
        console.log(err);
    }
}


//   ****** Method to connect MongoDb in best way ******
// instead of above method best is to use mongoose.connect(Mongo_uri)
// .then(()=>{
// app.listen(Port,()=>{
// console.log("server running on port ${PORT}")
// }); 
// )

startServer();

