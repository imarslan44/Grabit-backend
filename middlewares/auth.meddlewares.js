import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';


export const authorize = async(req, res, next)=>{

    try{

    const  token = req.cookies.token;

    console.log("token",token);
    
    if(!token) return res.status(401).json({success: false, message: "unAuthorized"});

    const decoded = jwt.verify(token, JWT_SECRET);
  
    const user = await User.findById(decoded.userId);

    if(!user) return res.status(401).json({success: false, message: "unAuthorized"});

        req.user = user;
        next();

    }catch(error){

      res.status(409).json(error.message);
      
    }

}