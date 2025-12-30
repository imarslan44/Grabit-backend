import cloudinary  from "../config/cloudinary.js";
import streamifier from "streamifier"
import Product from "../models/product.model.js"
//product functions for user.....

export const getProductList = async (req, res)=>{
//productList for admin
try{
    const productList = await Product.find({})

 
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

if(!productDetail) return res.status(404).json("product Not found")

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
console.log("variants", parseVariants)

const finalVarients = parseVariants.map((variant)=>{
    console.log(variant)
    const imageCount = variant.images.length;
    const endPoint = fieldIndex +imageCount
    const images = uploadedUrls.slice(fieldIndex, endPoint);
    fieldIndex = endPoint;
    return {...variant, images} 
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
    console.log(finalProduct);


    const newProduct = await new Product(finalProduct);
     newProduct.save();
     console.log()
     if(!newProduct) return res.status(401).json("something went wrong");

    return res.status(201).json({
        success: true, 
        message: "You did It Product created Successfully",
        data: newProduct,
    })

    }catch(error){
        return res.status(500).json({success: false, message: error.message})
    }
};



export const updateProduct = async (req, res)=>{
//update product details for seller

}

export const deleteProduct = async (req, res)=>{
//delte product by seller;
}

