const Order = require("../models/order-schema");

export const getOrders = async (req, res) => {
  const orders = await Order.find({});
  res.status(200).json({ status: "success", orders });
};

export const addOrder = async (req, res) => {
  const order = await Order.create(req.body);
  res.status(200).json({ status: "success", order });
};
