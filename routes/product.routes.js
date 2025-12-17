import { Router } from "express";
import { getProductList, getProductDetail, getSellerProducts, addProduct, updateProduct, deleteProduct } from "../controllers/product.controller";

const productRouter = Router();

productRouter.get('/', getProductList);;

productRouter.get("/:id", getProductDetail);

productRouter.get("/seller", getSellerProducts)

productRouter.post("/", addProduct);

productRouter.patch("/:id", updateProduct);

productRouter.delete("/:id", deleteProduct);

export default productRouter

