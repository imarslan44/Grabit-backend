import express from "express";
import { PORT } from "./config/env.js";
import connectDB from "./Database/mongodb.js";
import userAuthRouter from "./routes/userAuth.routes.js";
import cookieParser from 'cookie-parser';
import cors from "cors"
import cartRouter from "./routes/cart.routes.js";
import productRouter from "./routes/product.routes.js";
import sellerRouter from "./routes/sellerAuth.routes.js";
import orderRouter from "./routes/order.routes.js";
import userRouter from "./routes/user.routes.js";
const app = express();
app.use(cors({
  //multiple origins

  origin: ["http://localhost:3000", "http://localhost:5173", "https://gsthd191-5173.inc1.devtunnels.ms"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

//routes middlewares
app.use("/api/auth", userAuthRouter);
app.use("/api/cart", cartRouter);
app.use("/api/product", productRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/order", orderRouter)
app.use("/api/user", userRouter);



app.get('/', (req, res)=>{
  res.send("Wellcome to E-marketplace APIs");
});


app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
    connectDB();
})

