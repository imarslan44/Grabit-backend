import {Router} from "express"
import { getUserData } from "../controllers/user.controller.js";
import { authorize } from "../middlewares/auth.meddlewares.js";
const userRouter = Router();

userRouter.get("/", authorize, getUserData)

export default userRouter