import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {type:String, required: [true, "User name is required"]},
  email: { type: String, unique: true, required: [true, "email is rquired"] },
  password: {type: String, minLength: 6, required: [true, "password is required"]},
  phone: {type: Number},
  addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});

const User = mongoose.model("User", UserSchema);

export default User;