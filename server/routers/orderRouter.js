import express from "express";
import { createOrder } from "../controllers/orderController.js";
import { isAuth } from "../middlewares/middleware.js";

const orderRouter = express.Router();

orderRouter.post("/", isAuth, createOrder);

export default orderRouter;
