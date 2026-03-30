import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

let connectionPromise = null;

const connectDB = async () => {
  try {
    if (!DB_URI) {
      throw new Error("DB_URI is missing");
    }

    if (mongoose.connection.readyState === 1) {
      return "MongoDB connected!!";
    }

    if (!connectionPromise) {
      console.log("Connecting to MongoDB...");
      connectionPromise = mongoose.connect(DB_URI);
    }

    await connectionPromise;
    console.log("MongoDB connection established");
    return "MongoDB connected!!";
  } catch (error) {
    console.error("MongoDB connection failed", error.message);
    connectionPromise = null;
    throw error;
  }
};

export default connectDB;
