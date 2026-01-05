import { Router } from "express";
import { sellerSignUp, sellerSignIn, AuthorizeSellerToken } from "../controllers/sellerAuth.controller.js";
import { AuthorizeSeller } from "../middlewares/sellerAuth.middlerwares.js";
const sellerRouter = Router();

sellerRouter.post("/sign-up", sellerSignUp);

sellerRouter.post("/sign-in", sellerSignIn);

sellerRouter.get("/authorize/token", AuthorizeSeller, AuthorizeSellerToken);

export default sellerRouter; 

