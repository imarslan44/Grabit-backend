
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
const sellerId = req.user._id;
const { title, description, category, subcategory, name, highlights, dimensions, variants, bestSeller, discount} = req.body;

if(!sellerId) return res.status(402).json("unAuthorized");

// const product = {
//     title,
//     name,
//     description, 
//     category,
//     subcategory,
//     highlights: JSON.parse(highlights),
//     dimensions: JSON.parse(dimensions),
//     variants: JSON.parse(variants),
//     bestSeller,
//     discount,
//     sellerId 
// }
    console.log(product);

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

