import { Router } from "express";
import { addToCart, deletCartItem, getCartItems } from "../controllers/cart.controller.js";
import { authorize } from "../middlewares/auth.meddlewares.js";
const cartRouter = Router();


cartRouter.get('/', authorize, getCartItems);

cartRouter.post("/", authorize, addToCart);

cartRouter.delete("/:id", authorize, deletCartItem);

export default cartRouter