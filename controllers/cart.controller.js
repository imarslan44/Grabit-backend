import Cart from "../models/cart.model.js";

export const getCartItems = async (req, res) =>{
    try{

    
    const user = req.user;
    const cartItems = await Cart.find({userId: user._id});
    
    return res.status(200).json({success: true, message: `${cartItems.length === 0 ? " cart items retrieved" :  "No items in cart"  }`, cartItems})
    }catch(error){
        res.status(500).json({success: false, message: error.message})
    }
}

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = req.user;

    // Basic validation
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid productId or quantity",
      });
    }

    // Check if item already exists in cart
    const existingItem = await Cart.findOne({ userId: user._id, productId });

    if (existingItem) {
      return res.status(409).json({   // 409 Conflict is a good semantic choice
        success: false,
        message: "Item already exists in cart",
      });
    }

    // Create new cart item
    const newCartItem = await Cart.create({
      userId: user._id,
      productId,
      quantity,
    });

    return res.status(201).json({
      success: true,
      message: "Item added to cart",
      cartItem: newCartItem,
    });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
