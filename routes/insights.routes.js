import { Router } from "express";

const insightsRouter = Router();

import { AuthorizeSeller } from "../middlewares/sellerAuth.middlerwares.js";
import { getSellerInsights } from "../controllers/insights.controller.js";

insightsRouter.get("/seller", AuthorizeSeller, getSellerInsights);

export default insightsRouter;