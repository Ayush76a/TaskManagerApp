import { createContext, useEffect, useState } from "react"; // import 'useEffect' from react
import Task from "./Task";
import TaskForm from "./TaskForm";
// import react-toastify to use toast variable
import { ToastContainer, toast } from 'react-toastify';

//import axios
import axios, {isCancel, AxiosError} from 'axios';

// the URL to the frontend is putted in the .env file in frontend app.js file
// import the 'URL'
import { URL } from "../App";

//for loading image
import loadingImage from "../assets/loader.gif"


const TaskList = () => {
    // these constants are our states
    const [tasks, setTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])
    
    //state for loading -> initailly is Loading is set to be false
    const [isLoading, setIsLoading] = useState(false)
    
    const [formData, setFormData] = useState({
        name:" ",
        completed:false
    })
    
    //getting name from formData
    const {name} = formData 
    
    // in TaskForm many functions ->
    // handleInputChange()  e=>event paramter -> to get the event.target property

    
    const handleInputChange = (e) =>{
          const {name, value} = e.target
          setFormData({...formData, [name]: value })
    }
    

    // Function to get Task
    const getTasks = async() =>{
        setIsLoading(true)
        // 'Axios' is used to fetch data from database
        
        try{
          const {data} =  await axios.get(`${URL}/api/v1/tasks`)
        //   console.log(data);
            setTasks(data)
          setIsLoading(false)
        }
        catch(err){
         toast.error(err.message)
           
         // if error comes ->
         setIsLoading(false)
        }
    }

    // EFFECT creation
    useEffect(()=>{
        getTasks()
    },[])
    

    
    
    
    // Function to Create Task 

    const createTask = async (e) =>{
       e.preventDefault()
       // using toastify to give the error
       if(name === ""){
        return toast.error("Input field can't be empty")
       }
       try{
          await axios.post(`${URL}/api/v1/tasks`, formData)
          toast.success("Task added successfully")
          setFormData({...formData, name:""})
       }
       catch(err){
          toast.error(err.message);
          console.log(err)
          // even if both backend and frotend are working on same http , we even get the 'Network error' on adding a task
          // this error is due to CORS(cross origin resource sharing) i.e. the url for the frontend and backend are different 
          // localhost:3000 and localhost:4000
          // to overcome this cors error and to share resources b/w the frontend and the backend -> use  .use(cors()) middleWare in the root backend file
          // also put the cors middleware above the route middleware to make it work
       }
    }


      
    return (
        <div>
            <h2>Task Manager</h2>
            
            <TaskForm name={name} 
            handleInputChange={handleInputChange}  createTask={createTask}  />

        <div className="--flex-between ---pb">
           <p>
            <b>Total Task :</b>0
           </p>
           <p>
            <b>Completed Task :</b>0
           </p>
            </div>
            <hr/>
            {
                isLoading && (
                    <div className="--flex-center">
                       <img scr ={loadingImage} alt="Loading"></img>
                    </div>
                )
            }
           <Task/>
       </div>
    )
}
export default TaskList