import { Router } from "express";

const sellerAuthRouter = Router();

sellerAuthRouter.post("/sign-up", sellerSignUp);

sellerAuthRouter.post("/sign-in", sellerSignIn);

export default sellerAuthRouter;
