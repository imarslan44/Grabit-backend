import cloudinary from "cloudinary"
import Product from "../models/product.model.js"
//product functions for user.....

export const getProductList = async (req, res)=>{
//productList for admin
}

export const getProductDetail = async (req, res)=>{
//product detail
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

const { title, description, category, subcategory, name, highlights, dimensions, variants, bestSeller, discount} = req.body;
const productImages = req.files;


const uploadedUrls = [];

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

const finalVarients = variants.map((varient)=>{

    const imageCount = varient.images.length;
    const endPoint = fieldIndex +imageCount
    const images = uploadedUrls.slice(fieldIndex, endPoint);
    fieldIndex = endPoint;
    return {...varient, images}
});






const finalProduct = {
    title,
    name,
    description, 
    category,
    subcategory,
    highlights: JSON.parse(highlights),
    dimensions: JSON.parse(dimensions),
    variants: JSON.parse(finalVarients),
    bestSeller,
    discount,
    sellerId 
}
    console.log(finalProduct);


    const newProduct = await new Product(finalProduct);
    await newProduct.save();

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

