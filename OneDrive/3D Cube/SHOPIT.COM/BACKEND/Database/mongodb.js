import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

const connectDB = async ()=>{
    try{
      await mongoose.connect(DB_URI);
      console.log("MongoDB connected!!")
    } catch(error){
      console.log("MongoDB connection failed", error.message);
      process.exit(1)//exit the process with failure
    }
}
export default connectDB