import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js"

export const getCartItems = async (req, res) => {
  try {
    const user = req.user;
    const cartItems = await Cart.find({ userId: user._id });
    if (!cartItems || cartItems.length === 0)
      return res.status(404).json({ success: false, message: "no items in cart" });

    const productIds = cartItems.map(i => i.productId);
    const productsList = await Product.find({ _id: { $in: productIds } }).select("title variants _id");
    const productsById = new Map(productsList.map(p => [p._id.toString(), p]));

    const products = cartItems.map(item => {
      const product = productsById.get(String(item.productId));
      if (!product) {
        return { _id: item._id, productId: item.productId, available: false, message: "product deleted" };
      }
      const variantIndex = Number.isInteger(item.variantIndex) ? item.variantIndex : parseInt(item.variantIndex) || 0;
      const selectedVariant = product.variants?.[variantIndex] ?? null;
      return {
        _id: item._id,
        title: product.title,
        variant: selectedVariant,
        productId: product._id,
        quantity: item.quantity,
        size: item.currentSize,
      };
    });

    return res.status(200).json({
      success: true,
      message: "cart items retrieved",
      cartItems: products,
    });
  } catch (error) {
    const status = error && error.statusCode ? error.statusCode : 500;
    const message = error && error.message ? error.message : String(error);
    res.status(status).json({ success: false, message });
  }
};


export const addToCart = async (req, res) => {
  try {
    const { productId, quantity, variantIndex, currentSize } = req.body;
    const user = req.user;



    // Basic validation
    if (!productId || !quantity || quantity <= 0 ) {
      return res.status(400).json({
        success: false,
        message: "Invalid productId or quantity",
      })
    };

    // Check if item already exists in cart
    const existingItem = await Cart.findOne({ userId: user._id, productId });

    if (existingItem) {
      return res.status(409).json({   
        success: false,
        message: "Item already exists in cart",
      });
    }

    // Create new cart item
    const newCartItem = await Cart.create({
      userId: user._id,
      productId,
      quantity,
      variantIndex : variantIndex || 0,
      currentSize
    });

    return res.status(201).json({
      success: true,
      message: "Item added to cart",
      cartItem: newCartItem,
    });
  } catch (error) {
    
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};


export const deletCartItem = async (req, res)=>{
  try{
    const {id} =  req.params; 

    const deletedItem = await Cart.findByIdAndDelete(id)

    if(!deletedItem) return res.status(500).json('something went wrong');

     return res.status(201).json({
      success: true,
      message: `item with ${deletedItem._id} has been removed from cart` 
     })
    

  }catch(error){
   res.status(500).json(error.message)
  }
}