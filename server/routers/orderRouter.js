import express from "express";
import { placeOrder } from "../controllers/orderController.js";
import { isAuth } from "../middlewares/middleware.js";

const orderRouter = express.Router();

orderRouter.post("/", isAuth, placeOrder);

export default orderRouter;
