import { Router } from "express";
import { signUp, signIn } from "../controllers/auth.controller.js";
import { authorize } from "../middlewares/auth.meddlewares.js";
import { AuthorizeUserToken } from "../controllers/auth.controller.js";

const userAuthRouter = Router();

userAuthRouter.post("/sign-up", signUp); 

userAuthRouter.post("/sign-in", signIn);

userAuthRouter.get("/authorize", authorize, AuthorizeUserToken)
 
export default userAuthRouter;
