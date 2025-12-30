import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js"
export const getCartItems = async (req, res) =>{
    try{

    
    const user = req.user;
    const cartItems = await Cart.find({userId: user._id});
    if(!cartItems) return res.status(404).json('no items in cart');

    const products = await Promise.all( 
      cartItems.map( async (item)=>{
       const product = await Product.findById(item.productId).select("title variants _id");
       if(!product)return res.status(404).json("cart items not found");

       const selectedVariant = product.variants[item.variantIndex];

       const preDetails = {quantity: item.quantity, size: item.currentSize, productID: item.productId};

       return {_id : item._id, title: product.title, variant : selectedVariant, productId: product._id,  ...preDetails };
    })
  );

  console.log(products)

    
     
    return res.status(200).json({
      success: true, 
      message: `${cartItems.length > 0 ? " cart items retrieved" :  "No items in cart"  }`, 
      cartItems: products});

    }catch(error){
        res.status(500).json({success: false, message: error.message})
    }
}


export const addToCart = async (req, res) => {
  try {
    const { productId, quantity, variantIndex, currentSize } = req.body;
    const user = req.user;

    console.log(req.body)

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
    console.error(error);
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