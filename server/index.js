import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouters from "./routers/userRouter.js";
import data from "./data.js";

dotenv.config({ path: "../.env" });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DATABASE
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successful!"))
  .catch((error) => console.error("Error connecting to Mongo- ", error));

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

app.use("/api/users", userRouters);

// ERROR HANDLER
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// LISTENER
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
