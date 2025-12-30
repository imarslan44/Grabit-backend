import Product from "../models/product.model";
import Order from "../models/order.model";
import Razorpay from "razorpay"
import { KEY_ID, KEY_SECRET } from "../config/env.js";


const razorpay = new Razorpay({
    key_id : KEY_ID,
    key_secret : KEY_SECRET,
})

export const placeOrderRazorpay = async (req, res)=>{

     const {productID, variantIndex, quantity, address, sizeIndex, price} = req.body;
     const user = req.user;

    try{
      if(!productID || !variantIndex || !quantity || !address){

            return  res.status(400).json({ error: "Required fields are missing" });
;

        };

 const product = await Product.findById(productID);


        if(!product) return res.json("Invalid productId");

        const variant = product.variants[variantIndex]; 

        const actualPrice = variant.sizes && sizeIndex !== undefined ? variant.sizes[sizeIndex].price : variant.price;

        if(price !== actualPrice ) res.json("price tempered");

        const orderData = {
            sellerId: product.sellerId,
            userId: user._id,
            productID,
            variantIndex,
            quantity,
            address,
            sizeIndex,
            price: actualPrice,
            status: "placed",
            paymentStatus: "pending",
        };


        const newOrder = await Order.create(orderData);

        if(!newOrder) return res.json("something went wrong")

            //create options object for razorpay order
            const options = {
                amount: (actualPrice * 100),
                currency: "INR",
                reciept: `rcpt_${Date.now()}`,
                payment_capture: 1,
            };

           const order =  await razorpay.orders.create(options);

           if (!order) return res.status(500).json({ error: "Payment order failed" });
           return res.status(200).json({
            success: true,
            order,
            key_id: KEY_ID,
           });


    } catch(error){
        console.error(error); return res.status(500).json({ error: "Internal server error" });
    }
}

export const placeOrderCOD = async (req , res) =>{

    const {productID, variantIndex, quantity, address, sizeIndex, price} = req.body;
    const user = req.user;

    try{

      if(!productID || !variantIndex || !quantity || !address){

            return  res.status(400).json({ error: "Required fields are missing" });


        };

      const product = await Product.findById(productID);


        if(!product) return res.json("Invalid productId");

        const variant = product.variants[variantIndex]; 
        const actualPrice = variant.sizes && sizeIndex !== undefined ? variant.sizes[sizeIndex].price : variant.price;

        if(price !== actualPrice ) res.json("price tempered");

        const orderData = {
            sellerId: product.sellerId,
            userId: user._id,
            productID,
            variantIndex,
            quantity,
            address,
            sizeIndex,
            price: actualPrice,
            status: "placed",
            paymentStatus: "COD",
        };

        if(!newOrder) return res.json("something went wrong")

        return res.status(200).json({
            success: true,
            message: "Order placed successfully",
            order: newOrder,
        });

    } catch(error){
        res.status(500).json("Internal server error");
        console.log(error.message)
    }
}
