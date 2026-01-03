import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import Razorpay from "razorpay"
import { KEY_ID, KEY_SECRET } from "../config/env.js";
import crypto from "crypto"; 


const razorpay = new Razorpay({
    key_id : KEY_ID,
    key_secret : KEY_SECRET,
})

export const placeOrderRazorpay = async (req, res)=>{
 
     const {productId, variantIndex, quantity, address, sizeIndex, shipping} = req.body;
     const user = req.user;

    try{
      if(!productId  || !quantity || !address){

            return  res.status(400).json({ error: "Required fields are missing" });
;

        };

 const product = await Product.findById(productId);


        if(!product) return res.json("Invalid productId");

        const variant = product.variants[variantIndex]; 

        const actualPrice = variant.sizes && sizeIndex !== undefined ? (variant.sizes[sizeIndex]?.price) : (variant.price )
   
        //if(price !== actualPrice ) res.json("price tempered");
   const amount = ((actualPrice * quantity) + shipping) || 1;

        const orderData = {
            sellerId: product.sellerId,
            userId: user._id,
            productId,
            variantIndex,
            quantity,
            address,
            sizeIndex,
            status: "placed",
            paymentType: "razorpay",
            paymentStatus: "pending",
            amount
            
        };


        const newOrder = await Order.create(orderData);

        if(!newOrder) return res.json("something went wrong")
        
            //create options object for razorpay order
            const options = {
                amount: (amount * 100) || (1 * 100),
                currency: "INR",
                receipt: `rcpt_${Date.now()}`,
                payment_capture: 1,
            };

           const order =  await razorpay.orders.create(options);

           if (!order) return res.status(500).json({ error: "Payment order failed" });

           return res.status(200).json({
            success: true,
            message: "order create waiting for payment verificaiton",
            order,
            key_id: KEY_ID,
            order_id: newOrder._id
           });


    } catch(error){
        console.error(error); return res.status(500).json({ error: "Internal server error" });
    }
}

// verify razorpay payment 
export const verifyRazorpay = async(req, res)=>{

    try{

   const {razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id} = req.body;

   const sign = razorpay_order_id + "|" + razorpay_payment_id;

   const expectedSign = crypto 
   .createHmac("sha256", KEY_SECRET) 
   .update(sign.toString()) 
   .digest("hex");

   if(expectedSign === razorpay_signature){
     
    const order =  await Order.findByIdAndUpdate(order_id, {paymentStatus: "completed", status: "placed"})

    return res.status(200).json({
        success: true,
        message: "payment verified successfully",
        order
    });

   }else{
    const order =  await Order.findByIdAndUpdate(order_id, {paymentStatus: "failed", status: "failed"})

    return res.status(402).json({
        success: false,
        message: "payment varification failed",
        order

    });

   }

    }catch(error){
        res.status(500).json("Internal server error");
        console.log(error);
    }
}




// place order with COD (Cash on delivery)
export const placeOrderCOD = async (req , res) =>{

    const {productId, variantIndex, quantity, address, sizeIndex, shipping} = req.body;

    const user = req.user;

    try{

      if(!productId  || !quantity || !address){

            return  res.status(400).json({ error: "Required fields are missing" });

        };

      const product = await Product.findById(productId);


        if(!product) return res.json("Invalid productId");

        const variant = product.variants[variantIndex]; 
        const actualPrice = variant.sizes && sizeIndex !== undefined ? variant.sizes[sizeIndex]?.price : variant?.price;

        //if(price !== actualPrice ) res.json("price tempered");

        const orderData = {
            sellerId: product.sellerId,
            userId: user._id,
            productId,
            variantIndex,
            quantity,
            address,
            sizeIndex,
            status: "placed",
            paymentType: "COD",
            paymentStatus: "pending",
            amount: (actualPrice * quantity) + shipping
        };

        


        const newOrder = await Order.create(orderData);
        if(!newOrder) return res.json("something went wrong");

        
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
