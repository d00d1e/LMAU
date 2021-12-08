import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";

// SEED PRODUCTS
export const seedProducts = expressAsyncHandler(async (req, res) => {
  // await Product.remove({});
  const products = await Product.insertMany(data.products);

  res.send({ products });
});

// GET PRODUCTS
export const getAllProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.send(products);
});

// GET PRODUCT DETAILS
export const getProductDetails = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});
