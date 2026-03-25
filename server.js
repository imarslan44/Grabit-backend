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
console.log("CORS allowed origins:", FRONTEND_URL, SELLER_SITE_URL);
const app = express();

 //app.use(cors({ origin: [FRONTEND_URL, SELLER_SITE_URL] })) 
 // allow CORS for frontend and seller origins and include credentials ;
app.use(cors({
  origin: [FRONTEND_URL, SELLER_SITE_URL],
  credentials: true,
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


app.listen(PORT, '0.0.0.0', ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
    connectDB();
})

