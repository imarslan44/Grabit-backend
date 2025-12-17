import { Router } from "express";
import { addToCart, getCartItems } from "../controllers/cart.controller.js";
import { authorize } from "../middlewares/auth.meddlewares.js";
const cartRouter = Router();


cartRouter.get('/', authorize, getCartItems);

cartRouter.post("/", authorize, addToCart);

export default cartRouter