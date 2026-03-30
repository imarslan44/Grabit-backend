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
import { FRONTEND_URL, SELLER_SITE_URL } from "./config/env.js";
import User from "./models/user.model.js";
import mongoose from "mongoose";
console.log("CORS allowed origins:", FRONTEND_URL, SELLER_SITE_URL);
const app = express();

let dbConnection = "DB not connected";

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser tools (no Origin header)
      if (!origin) return callback(null, true);
      // With credentials: true, we must NEVER return '*' from CORS.
      // Echo back the requesting origin so cookies work across origins.
      return callback(null, origin);
    },
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());

//routes middlewares
app.use("/api/auth", userAuthRouter);
app.use("/api/cart", cartRouter);
app.use("/api/product", productRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/order", orderRouter)
app.use("/api/user", userRouter);


const ensureDBConnected = async () => {
  if (mongoose.connection.readyState === 1) return "MongoDB connected!!";
  return connectDB();
};


app.get('/', async (req, res)=>{
  try{
  const connection = await ensureDBConnected();
  dbConnection = JSON.stringify(connection);
  const user  = await  User.findOne() || "No user found"; 
  res.json({message: "server is running but.||",
     data: user,
     dbConnection,
  });
  }catch(error){
    res.json({message: "server is running but DB connection failed",
     error: error.message,
     dbConnection: dbConnection
    });
  }
});

// Try connecting on cold start so first request is faster.
try {
  const connection = await ensureDBConnected();
  dbConnection = JSON.stringify(connection);
} catch (error) {
  dbConnection = "DB not connected";
}

if (process.env.VERCEL !== "1") {
  app.listen(PORT, "0.0.0.0", async () => {
    console.log(`server is running on http://localhost:${PORT}`);
    try {
      const connection = await ensureDBConnected();
      dbConnection = JSON.stringify(connection);
    } catch (error) {
      dbConnection = "DB not connected";
    }
  });
}

export default app;

