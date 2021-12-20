import express from "express";
import {
  createOrder,
  getOrderDetails,
} from "../controllers/orderController.js";
import { isAuth } from "../middlewares/middleware.js";

const orderRouter = express.Router();

orderRouter.post("/", isAuth, createOrder);
orderRouter.get("/:id", isAuth, getOrderDetails);

export default orderRouter;
