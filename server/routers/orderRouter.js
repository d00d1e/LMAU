import express from "express";
import {
  createOrder,
  getOrderDetails,
  getOrderHistory,
  payOrder,
} from "../controllers/orderController.js";
import { isAuth } from "../middlewares/middleware.js";

const orderRouter = express.Router();

orderRouter.post("/", isAuth, createOrder);
orderRouter.get("/history", isAuth, getOrderHistory);
orderRouter.get("/:id", isAuth, getOrderDetails);
orderRouter.put("/:id/pay", isAuth, payOrder);

export default orderRouter;
