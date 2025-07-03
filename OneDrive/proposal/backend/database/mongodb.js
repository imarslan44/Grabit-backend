import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();

const connectDb = async()=>{

    try{
        //////////////////////////
   await mongoose.connect(process.env.MONGO_URI)
   console.log("connected to db")
    
    } catch(err){

        console.log(err)
    }
} 

export default connectDb