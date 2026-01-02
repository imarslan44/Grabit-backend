import express, {Router} from "express"
import { placeOrderCOD, placeOrderRazorpay, verifyRazorpay } from "../controllers/order.controller.js";
import {authorize} from "../middlewares/auth.meddlewares.js"

const orderRouter = Router();


orderRouter.post("/place/cod", authorize, placeOrderCOD);

orderRouter.post("/place/razorpay", authorize, placeOrderRazorpay);

orderRouter.post("/razorpay/verify", verifyRazorpay);

export default orderRouter