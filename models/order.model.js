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
    mobile: {type: String, required:[true, "Mobile no required"]},
    street: { type: String, required: true },
    city: { type: String, required: true },
    pincode: String,
    landmark: String,  
  },

  status: { type: String, enum: ["placed", "shipped", "out for delivery", "delivered", "canceled", "return requested", "returned"], default: 'placed' },

  paymentStatus: { type: String, enum: ["COD ",  "razorpay", "COD completed", "failed", "pending", "refund requested", "refunded", ]}
  
},{timestamps: true});


const Order = mongoose.model("Order", OrderSchema);
export default Order;