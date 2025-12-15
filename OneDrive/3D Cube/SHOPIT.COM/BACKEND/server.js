import express from "express";
import { PORT } from "./config/env.js";
import connectDB from "./Database/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from 'cookie-parser';


const app = express();
app.use(express.json());
app.use("/api/auth", authRouter);
app.use(cookieParser());

app.get('/', (req, res)=>{
  res.send("Wellcome to E-marketplace APIs");
});


app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
    connectDB();
})

