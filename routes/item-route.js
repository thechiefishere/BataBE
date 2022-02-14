const express = require("express");
const itemRoute = express.Router();
const { authMiddleware, adminMiddleware } = require("../middleware/auth");

const {
  getAllItems,
  addItem,
  deleteAllItems,
  getSingleItem,
  updateSingleItem,
  deleteSingleItem,
} = require("../controllers/item-controller");

itemRoute
  .route("/")
  .get(getAllItems)
  .post(authMiddleware, adminMiddleware, addItem)
  .delete(authMiddleware, adminMiddleware, deleteAllItems);
itemRoute
  .route("/:itemId")
  .get(getSingleItem)
  .patch(authMiddleware, adminMiddleware, updateSingleItem)
  .delete(authMiddleware, adminMiddleware, deleteSingleItem);

module.exports = itemRoute;
