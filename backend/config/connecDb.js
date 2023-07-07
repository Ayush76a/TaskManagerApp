const mongoose = require("mongoose");


// Add the Name of the foleder i.e. '/TaskManager' in the .env file so that mongoDb get known in which database the information has to be stored


const connecDb = async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    }
    catch(err)
    {
      console.log(err);
      process.exit(1);
    }
}


module.exports = connecDb