import express, {Router} from "express"
import { placeOrderCOD, placeOrderRazorpay, verifyRazorpay } from "../controllers/order.controller.js";
import {authorize} from "../middlewares/auth.meddlewares.js"
import { AuthorizeSeller } from "../middlewares/sellerAuth.middlerwares.js";
import { updateOrderStatus, getSellerOrders, getUserOrders } from "../controllers/order.controller.js";

const orderRouter = Router();

// routes to place order
orderRouter.post("/place/cod", authorize, placeOrderCOD);

orderRouter.post("/place/razorpay", authorize, placeOrderRazorpay);

orderRouter.post("/razorpay/verify", verifyRazorpay);

// routes to update order data 

orderRouter.patch("/status/:id", AuthorizeSeller, updateOrderStatus)

// routes to get order details

orderRouter.get("/seller", AuthorizeSeller ,getSellerOrders);

orderRouter.get("/user", authorize, getUserOrders);



export default orderRouter