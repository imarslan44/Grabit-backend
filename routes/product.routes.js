import { Router } from "express";
import { getProductList, getProductDetail, getSellerProducts, addProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import upload from "../middlewares/multer.js";
import { AuthorizeSeller } from "../middlewares/sellerAuth.middlerwares.js";


const productRouter = Router();
//Routes for seller controll 
productRouter.get("/seller", AuthorizeSeller, getSellerProducts);

productRouter.post("/add", AuthorizeSeller, upload.array("images"), addProduct);

//
productRouter.get('/', getProductList);;

productRouter.get("/:id", getProductDetail);



productRouter.patch("/:id", AuthorizeSeller, updateProduct);

productRouter.delete("/:id", AuthorizeSeller, deleteProduct);

export default productRouter

