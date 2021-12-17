import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouters from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import authRouter from "./routers/authRouter.js";
import orderRouter from "./routers/orderRouter.js";

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
  .catch((error) => console.error("Error connecting to MongoDB- ", error));

// ROUTES
app.use("/api/auth", authRouter);
app.use("/api/users", userRouters);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
  res.send("lmeow");
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// LISTENER
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
