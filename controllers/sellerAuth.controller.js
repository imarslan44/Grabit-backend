import Seller from "../models/seller.model.js";
import jwt from "jsonwebtoken"
import { JWT_SECRET, JWT_EXPIRATION } from "../config/index.js";
import bcrypt from "bcryptjs";

export const sellerSignUp = async (req, res) => {
  try {
    const { name, storeName, email, phone, address, PAN, AccountNumber, IFSC, verified, password } = req.body;

    if (!name || !storeName || !email || !phone || !address || !PAN || !AccountNumber || !IFSC || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const conditions = [];
    if (email) conditions.push({ email });
    if (phone) conditions.push({ phone });
    if (PAN) conditions.push({ PAN });
    if (AccountNumber) conditions.push({ AccountNumber });

    const existingSeller = await Seller.findOne({ $or: conditions });
    if (existingSeller) {
      return res.status(409).json({ message: "Seller with provided details already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newSeller = new Seller({
      name,
      storeName,
      email,
      password: hashedPassword,
      phone,
      address,
      PAN,
      AccountNumber,
      IFSC,
      verified: Boolean(verified),
    });

    await newSeller.save();

    const token = jwt.sign(
      { sellerId: newSeller._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION || "1h" }
    );

    res.cookie("sellerToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: (process.env.JWT_EXPIRATION ? parseInt(process.env.JWT_EXPIRATION) : 3600) * 1000
    });

    return res.status(201).json({
      message: "Seller registered successfully",
      seller: newSeller,
      token
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export const sellerSignIn = async (req, res) => { 
  try { 
    const { email, password, phone } = req.body;

     if (!email && !phone) {
       return res.status(400).json({ message: "Email or Phone is required" }); 
      } 
      if (!password) { 
        return res.status(400).json({ message: "Password is required" });
     } 
     
     const seller = await Seller.findOne({ $or: [{ email }, { phone }] }).select("+password");

      if (!seller) {
         return res.status(404).json({ message: "Seller not found" }); 
        } 

        const isMatch = await bcrypt.compare(password, seller.password);

         if (!isMatch) {
           return res.status(401).json({ message: "Invalid credentials" }); 
          } 
          const expiresIn = process.env.JWT_EXPIRATION || "1h";
           const token = jwt.sign({ sellerId: seller._id }, process.env.JWT_SECRET, { expiresIn });

            res.cookie("sellerToken", token, {
               httpOnly: true,
               secure: process.env.NODE_ENV === "production",
               sameSite: "lax", 
               maxAge: typeof expiresIn === "number" ? expiresIn * 1000 : 3600000 }); 

               seller.password = undefined; 
               // hide password before sending

       return res.status(200).json({ message: "Seller signed in successfully", seller, token });

      }catch(error){

           return res.status(500).json({message: error.message});

  }
}