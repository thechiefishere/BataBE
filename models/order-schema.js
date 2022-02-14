const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { itemSchema } = require("../models/item-schema");

const orderSchema = new Schema(
  {
    item: {
      type: itemSchema,
      required: [true, "Please what was ordered?"],
    },
    count: {
      type: Number,
      default: 1,
    },
    size: {
      type: Number,
      requred: [true, "What is the size of the item?"],
    },
    orderedBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "Please who placed the order?"],
    },
    state: {
      type: String,
      enum: ["cart", "pending", "delivered"],
      default: "cart",
    },
    paid: {
      type: Boolean,
      default: false,
    },
    orderDeliveryAddress: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
