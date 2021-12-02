import express from "express";
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

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
