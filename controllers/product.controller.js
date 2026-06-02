import cloudinary  from "../config/cloudinary.js";
import streamifier from "streamifier"
import Product from "../models/product.model.js"
import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js"
//product functions for user.....

export const getProductList = async (req, res)=>{
//productList for admin
let index = req.query.index ;

try{ 
    //pagination can be implemented here using index and limit
    const productList = await Product.find().skip(index).limit(10);

    if(!productList) return res.status(500).json('something went wrong')

    return res.status(200).json({
        success: true,
        message: "product list retrieved",
        data: productList 

    })
    

}catch(error){
    res.status(error?.statusCode || 500 ).json(error.message)
}
}

export const getProductDetail = async (req, res)=>{
//product detail
const {id} = req.params; 
try{

const productDetail = await Product.findById(id);

if(!productDetail) return res.status(404).json("product Not found");


    return res.status(201).json({
        success: true,
        message: "product detail retrieved",
        productDetail,
    })

}catch(error){
    res.status(error?.statusCode || 500).json(error.message)
}

};


//seller product controller functions...

export const getSellerProducts = async (req, res)=>{
//products of specific seller


  const sellerId = req.sellerId;
 
   
try{

    const products = await Product.find({sellerId}).lean().sort({createdAt: -1}).exec(); //by using exec() we can get a real promise and use try catch for error handling

    if(!products) return res.status(200).json({
        success: false,
        message: "no products yet!"
    });

    return res.status(200).json({
        success: true,
        message: "Products retrieved!",
        products
    });

}catch(error){
    return res.status(500).json({success: false, message: "Internal server error!",
    });

}

};


export const addProduct = async (req, res)=>{

//add product use multer for images

try{

const sellerId = req.sellerId;

if(!sellerId) return res.status(401).json("unAuthorized");

const { title, description, category, subcategory,  attributes, model, brand, variants, delivery, warranty,  discount} = req.body;

const productImages = req.files;

const uploadedUrls = [];

if(!productImages) return res.status(401).json({success: false, message: "images are required"});

if(!title || !description || !category || !subcategory || !attributes ||  !model || !brand || !variants[0] || !delivery ){

    return res.status(401).json({success: false, message: "some required fiels are missing"});
}

for(const image of productImages){
    //upload to cloudinary
    const url = await new Promise((resolve, reject)=>{

        const uploadStream = cloudinary.uploader.upload_stream(
            {folder: "products"},
            (error, result)=>{
                if(error) return reject(error);
                return resolve(result.secure_url);
            }
        )

        streamifier.createReadStream(image.buffer).pipe(uploadStream)
    })

    uploadedUrls.push(url);

};


let fieldIndex = 0;

//const parsed = variants.flatMap(str => JSON.parse(str)); 
const parseVariants = JSON.parse(variants)


const finalVarients = parseVariants.map((variant)=>{
    const imageCount = variant.images.length;
    const endPoint = fieldIndex + imageCount
    const images = uploadedUrls.slice(fieldIndex, endPoint);
    fieldIndex = endPoint;
    return {...variant, images}; 
});





const finalProduct = {
    title,
    description, 
    category,
    subcategory,
    attributes: JSON.parse(attributes),
    variants: finalVarients,
    delivery: JSON.parse(delivery),
    brand,
    model,
    warranty,
    discount,
    sellerId    
}
    


    const newProduct = await new Product(finalProduct);
    newProduct.save();
     if(!newProduct) return res.status(401).json("something went wrong");

    return res.status(201).json({
        success: true, 
        message: "You did It Product created Successfully",
        data: newProduct,
    });

    }catch(error){
        return res.status(500).json({success: false, message: error.message})
    }
};



export const updateProduct = async (req, res)=>{
//update product details for seller

}

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // 1) Check orders for this product
    const OrdersAvailable = await Order.find({ productId: id });
    let activeOrders = false;

    if (OrdersAvailable && OrdersAvailable.length > 0) {
      for (const order of OrdersAvailable) {
        const status = order.status;
        if (!["succeed", "returned", "canceled", "failed"].includes(status)) {
          activeOrders = true;
          break;
        }
      }
    }

    if (activeOrders) {
      return res.json({
        success: false,
        message: "Delete failed. This product has active orders.",
        data: OrdersAvailable,
      });
    }

    // 2) Mark related cart items unavailable (bulk update)
    await Cart.updateMany({ productId: id }, { $set: { available: false } });

    // 3) Delete the product
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(200).json({
        success: false,
        message: "Failed to delete this product — it may already be deleted.",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Product with _id: ${id} has been deleted`,
      data: deletedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


//search product by name, category, subcategory, attributes, brand, model etc....

export const searchProducts = async (req, res)=> {
    const query = req.params.query || req.query.query;
    console.log("Search query:", query);

    if (!query) {
        return res.status(400).json({
            success: false,
            message: "Search query is missing",
        });
    }

    try{

        // if title, category, subcategory, attributes, brand or model includes the query then return the products

        const searchResults = await Product.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { category: { $regex: query, $options: "i" } }, 
                { subcategory: { $regex: query, $options: "i" } },
                { brand: { $regex: query, $options: "i" } },
                { model: { $regex: query, $options: "i" } }
            ]
        });//attributes search can be implemented here by using $elemMatch for array of objects

        if(searchResults.length === 0) return res.status(200).json({
            success: false,
            message: "No search results found",
        });

        return res.status(200).json({
            success: true,
            message: "Search results found",
            data: searchResults
        });

    } catch(error){
        return res.status(500).json({success: false, message: "Internal server error"})
    }





}
