import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// PLACE ORDER
export const placeOrder = expressAsyncHandler(async (req, res) => {
  if (req.body.orderItems.length === 0) {
    res.status(400).send({ message: "Cart is empty" });
  }

  const order = new Order({
    orderItems: req.body.orderItems,
    shippingAddress: req.body.shippingAddress,
    payment: req.body.paymentMethod,
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
    user: req.user._id,
  });

  const createdOrder = await order.save();

  res.status(201).send({ message: "Order created", createdOrder });
});
