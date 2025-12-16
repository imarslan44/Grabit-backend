import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
  
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    price: Number
  }],
  // Snapshot of address at time of order
  address: {
    mobile: {type: String, required:[true, "Mobile no required"]},
    street: { type: String, required: true },
    city: { type: String, required: true },
    pincode: String,
    landmark: String,
    
  },

  status: { type: String, enum: ['pending', 'paid', 'delivered'], default: 'pending' },
  
},{timestamps: true});


const Order = mongoose.model("Order", OrderSchema);
export default Order;