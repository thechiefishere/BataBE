const { Item } = require("../models/item-schema");
const { NotFoundError } = require("../errors");

const getAllItems = async (req, res) => {
  const items = await Item.find({});
  res.status(200).json({ status: "success", items });
};

const addItem = async (req, res) => {
  const item = await Item.create(req.body);
  res.status(200).json({ status: "success", item });
};

const deleteAllItems = async (req, res) => {
  const items = await Item.deleteMany({});
  res.status(200).json({ status: "success", msg: "All Items are deleted" });
};

const getSingleItem = async (req, res) => {
  const { itemId } = req.params;
  const item = await Item.findOne({ _id: itemId });
  if (!item) {
    throw new NotFoundError("The item was not found");
  }
  res.status(200).json({ status: "success", item });
};

const updateSingleItem = async (req, res) => {
  const { itemId } = req.params;
  const item = await Item.findOneAndUpdate({ _id: itemId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) {
    throw new NotFoundError("The item was not found");
  }
  res.status(200).json({ status: "success", item });
};

const deleteSingleItem = async (req, res) => {
  const { itemId } = req.params;
  const item = await Item.findOneAndDelete({ itemId });
  if (!item) {
    throw new NotFoundError("The item was not found");
  }
  res.status(200).json({ status: "success", msg: "Item deleted" });
};

module.exports = {
  getAllItems,
  addItem,
  deleteAllItems,
  getSingleItem,
  updateSingleItem,
  deleteSingleItem,
};
