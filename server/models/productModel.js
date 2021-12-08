import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    sizes: { type: Array, required: true },
    countInStock: { type: Number, required: true },
    category: { type: String, required: true },
    featured: { type: Boolean, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
