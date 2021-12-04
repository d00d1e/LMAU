import express, { application } from "express";
import dotenv from "dotenv";

import data from "./data.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DATABASE

// ROUTES
app.get("/", (req, res) => {
  res.send("server");
});
app.get("/api/products", (req, res) => {
  res.send(data.products);
});
app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((i) => i._id === req.params.id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
