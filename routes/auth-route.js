const express = require("express");
const authRoute = express.Router();
const { authMiddleware } = require("../middleware/auth");

const { login, signup, logout } = require("../controllers/auth-controller");

authRoute.route("/signup").post(signup);
authRoute.route("/login").post(login);
authRoute.route("/logout").delete(authMiddleware, logout);

module.exports = authRoute;
