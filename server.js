import express from "express";
import { PORT } from "./config/env.js";
import connectDB from "./Database/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from 'cookie-parser';
import cors from "cors"
import cartRouter from "./routes/cart.routes.js";
import productRouter from "./routes/product.routes.js";

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

//routes middlewares
app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);
app.use("/api/product", productRouter);



app.get('/', (req, res)=>{
  res.send("Wellcome to E-marketplace APIs");
});


app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
    connectDB();
})

