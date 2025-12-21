import { Router } from "express";
import { sellerSignUp, sellerSignIn } from "../controllers/sellerAuth.controller.js";
const sellerAuthRouter = Router();

sellerAuthRouter.post("/sign-up", sellerSignUp);

sellerAuthRouter.post("/sign-in", sellerSignIn);

export default sellerAuthRouter;
