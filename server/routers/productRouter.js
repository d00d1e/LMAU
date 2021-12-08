import express from "express";
import {
  getAllProducts,
  getProductDetails,
  seedProducts,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/seed", seedProducts);
productRouter.get("/:id", getProductDetails);

export default productRouter;
