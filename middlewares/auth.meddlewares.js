import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';


export const authorize = async(req, res, next)=>{

    try{
    const  token = req.cookies.authToken;
    console.log("token",token);
    if(!token) return res.status(401).json("unAuthorized");

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("decoded: ", decoded);
    const user = await User.findById(decoded.userId);

    if(!user) return res.status(401).json("unAuthorized")
        req.user = user;
    next();


    }catch(error){

      res.status(409).json(error.message);
      
    }

}