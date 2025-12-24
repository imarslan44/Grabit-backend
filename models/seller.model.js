import mongoose from "mongoose";

//seller schema
const sellerSchema = new mongoose.Schema({
   
  name: {type: String, required: true},
  storeName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true, select: false, minLength: 8}, 
  phone: {type: String, required: true, unique: true},
  address: {type: String, required: true},
  pinCode: {type: String, required: true},
  verified: {type: Boolean, default: false},
  PAN: {type: String, required: true, unique: true},
  AccountNumber: {type: String, required: true, unique: true},
  IFSC: {type: String, required: true},

},{timestamps: true});

const Seller = mongoose.model("Seller", sellerSchema);

export default Seller;
