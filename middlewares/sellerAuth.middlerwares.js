import jwt from "jsonwebtoken";
import Seller from "../models/seller.model.js";
import { JWT_SECRET } from "../config/env.js";

export const AuthorizeSeller = async (req, res, next) => {
  try {
    const token = req.cookies.sellerToken; // match cookie name
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const seller = await Seller.findById(decoded.sellerId);

    if (!seller._id) {
      return res.status(404).json({ success: false, message: "Seller not found" });
    }

    req.sellerId = seller._id;
    next(); // important!

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
