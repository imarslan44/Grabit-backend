import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB..."); //is logged
    await mongoose.connect(DB_URI);// is connected successfully but the following logs are not printed
    console.log("MongoDB connection established");//is logged
     mongoose.connection.on("connected", () => {
       console.log("✅ MongoDB connected successfully");//is not logged
     });

     mongoose.connection.on("error", (err) => {
       console.error("❌ MongoDB connection error:", err.message);//is not logged
   });

     mongoose.connection.on("disconnected", () => {
      console.log("⚠️ MongoDB disconnected");
     });

    return "MongoDB connected!!";
  } catch (error) {
    console.error("MongoDB connection failed", error.message);
    process.exit(1);
  }
};

export default connectDB;
