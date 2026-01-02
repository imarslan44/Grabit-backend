import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
  sellerId: {type: mongoose.Schema.Types.ObjectId, ref: "Seller"},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  variantIndex: {type: Number, required : [true, "variantIndex is required"]},
  sizeIndex: Number,
  price: Number,
  quantity: Number,
  

  // Snapshot of address at time of order
  address: {
    firstName: String,
    lastName: String,
    phone: {type: String, required:[true, "Mobile no required"]},
    street: { type: String, required: true },
    city: { type: String, required: true },
    pinCode: {type: String, required: true},
    landMark: String,  
  },
  ammount : {type: Number, required : [true, "total ammout is required"]},
  status: { type: String, enum: [ "failed", "placed", "shipped", "out for delivery", "delivered", "canceled", "return requested", "returned"], default: 'placed' },
  paymentType: {type: String, enum: ["COD", "razorpay"] },
  paymentStatus: { type: String, enum: [  "pending", "completed", "failed","refund requested", "refunded", ]}
  
},{timestamps: true});


const Order = mongoose.model("Order", OrderSchema);
export default Order;