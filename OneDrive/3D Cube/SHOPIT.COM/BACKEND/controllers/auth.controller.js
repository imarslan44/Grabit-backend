import mongoose from 'mongoose';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRATION } from '../config/env.js';

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

  // Regex email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

 // Normalize email
    const normalizedEmail = email.trim().toLowerCase();
   
// Hash password
    const hashedPassword =  bcrypt.hash(password, 10);

// Create user — rely on unique index at DB level to prevent duplicates
    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

// Sign JWT 
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

// Prepare safe user payload
    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
//send cookie
     res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
     });

//send response
    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {user: safeUser },
    });

  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }
    return next(error);
  }
};



//login / signIn controller

export const signIn = async (req, res)=>{
   const {email, password} = req.body;
   try{
    
    if(!email || !password) return res.status(400).json({success: false, message: "missing required fields"});
    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({email: normalizedEmail});

    if(!user){
        const error = new Error("User not found");
        error.statusCode = 402;
        throw error;
    }

    const isValidPassword =  await bcrypt.compare(password, user.password);
  
    if(!isValidPassword){
        const error = new Error("Invalid email or password");
        error.statusCode = 409;
        throw error
    }

    const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRATION});
     const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
       };

       //send token in cookie
      res.cookie("token", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

    return res.status(200).json({
        success: true,
        message: "signedIN successfully!",
        data: {user : safeUser}
    });

   }catch(error){
    res.status(error.statusCode).json({
        messsage: error.message,
    })
   }
} 
