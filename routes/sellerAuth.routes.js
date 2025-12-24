import { Router } from "express";
import { sellerSignUp, sellerSignIn } from "../controllers/sellerAuth.controller.js";
const sellerRouter = Router();

sellerRouter.post("/sign-up", sellerSignUp);

sellerRouter.post("/sign-in", sellerSignIn);

export default sellerRouter; 
