import mongoose from "mongoose"

const CartSchema =  new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    productId: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
    quantity: {type: Number, required: [true, "quantity required"]}
})

 const Cart = mongoose.model("Cart", CartSchema);

 export default Cart