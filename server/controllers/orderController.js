import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// CREATE ORDER
export const createOrder = expressAsyncHandler(async (req, res) => {
  if (req.body.orderItems.length === 0) {
    res.status(400).send({ message: "Cart is empty" });
  } else {
    const order = new Order({
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      subtotal: req.body.subtotal,
      shipping: req.body.shipping,
      tax: req.body.tax,
      total: req.body.total,
      user: req.user._id,
    });

    const createdOrder = await order.save();

    res.status(201).send({ message: "New order created", order: createdOrder });
  }
});

// GET ORDER DETAILS
export const getOrderDetails = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404).send({ message: "Order not found" });
  }

  res.send(order);
});