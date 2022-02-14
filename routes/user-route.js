const express = require("express");
const userRoute = express.Router();
const { authMiddleware, adminMiddleware } = require("../middleware/auth");

const {
  getUsers,
  deleteUsers,
  getSingleUser,
  updateUser,
  deleteSingleUserAdmin,
  getSingleUserAdmin,
  updateSingleUserAdmin,
} = require("../controllers/user-controller");

userRoute
  .route("/")
  .get(authMiddleware, adminMiddleware, getUsers)
  .delete(authMiddleware, adminMiddleware, deleteUsers);
userRoute
  .route("/user")
  .get(authMiddleware, getSingleUser)
  .patch(authMiddleware, updateUser);
userRoute
  .route("/:userId")
  .get(authMiddleware, adminMiddleware, getSingleUserAdmin)
  .patch(authMiddleware, adminMiddleware, updateSingleUserAdmin)
  .delete(authMiddleware, adminMiddleware, deleteSingleUserAdmin);

module.exports = userRoute;
