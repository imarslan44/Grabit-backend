import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import { SHIPPING_FEE } from "../config/env.js";
export const getSellerInsights = async (req, res) => {
  try {
    const sellerId = req.sellerId;
    if (!sellerId) {
      return res.status(400).json({ success: false, message: "Seller ID not found"});
    }

    // Get total number of products
    const totalProducts = await Product.countDocuments({ sellerId });

    // Get all orders for the seller
    const orders = await Order.find({ sellerId });
  

    // Filter for delivered orders
    const deliveredOrders = orders.filter(order => order.status === 'DELIVERED');
    

    
    console.log("Delivered Orders:", deliveredOrders);
    //lo
    // Calculate total orders and revenue
    const totalOrders = orders.length;
    const totalRevenue = deliveredOrders.reduce((acc, order) => {
      const productTotal = (order.amount - SHIPPING_FEE || 0) * (order.quantity || 1);
      return acc + productTotal;
    }, 0);
    
    // Calculate monthly sales for the last 12 months
    const monthlySales = Array(12).fill(0);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const currentMonth = new Date().getMonth();
    const last12Months = [];

    for (let i = 0; i < 12; i++) {
        const monthIndex = (currentMonth - i + 12) % 12;
        last12Months.unshift(monthNames[monthIndex]);
    }
    
    deliveredOrders.forEach(order => {
      if (order.createdAt && order.price) {
        const orderMonth = new Date(order.createdAt).getMonth();
        const monthDiff = (currentMonth - orderMonth + 12) % 12;
        if (monthDiff < 12) {
          const productTotal = (order.price || 0) * (order.quantity || 1);
          monthlySales[11 - monthDiff] += productTotal;
        }
      }
    });
console.log("Total Revenue:", totalRevenue);
console.log("Monthly Sales:", monthlySales);


   return res.status(200).json({
      success: true,
      data: {
        totalProducts,
        totalOrders,
        totalRevenue,
        monthlySales : {
          labels: last12Months,
          values: monthlySales,
        }
      },
    });
  } catch (error) {
    console.error("Error in getSellerInsights:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


