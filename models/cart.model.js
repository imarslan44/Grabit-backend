import mongoose from "mongoose"

const CartSchema = mongoose.schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    productId: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
    quantity: {type: Number, required: [true, "quantity required"]}
})

export const Cart = mongoose.model("Cart", CartSchema);