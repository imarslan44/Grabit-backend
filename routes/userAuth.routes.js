import { Router } from "express";
import { signUp, signIn } from "../controllers/auth.controller.js";

const userAuthRouter = Router();

userAuthRouter.post("/sign-up", signUp); 

userAuthRouter.post("/sign-in", signIn);
 
export default userAuthRouter;
