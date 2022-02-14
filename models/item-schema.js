const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the item's name"],
    },
    description: {
      type: String,
    },
    price: {
      type: String,
      required: [true, "Please provide the price of the item"],
    },
    type: {
      type: String,
      enum: ["shoe", "palm"],
      required: [true, "Please provide the item type"],
    },
    images: {
      type: [String],
      required: [true, "Please provide item's image location"],
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);
module.exports = { Item, itemSchema };
