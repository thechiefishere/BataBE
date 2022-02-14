const { BadRequestError, Forbidden, NotFoundError } = require("../errors");
const jwt = require("jsonwebtoken");
const User = require("../models/user-schema");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new BadRequestError("Authentification failed");
  }

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    throw new BadRequestError("Authentification failed");
  }
  const { id: userId } = decoded;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new NotFoundError("User does not exist");
  }
  const tokenPresent = user.tokens.find((t) => {
    return t.token == token;
  });
  if (!tokenPresent) {
    throw new BadRequestError("Authentification failed");
  }
  req.user = { userId, token };
  next();
};

const adminMiddleware = async (req, res, next) => {
  const { userId } = req.user;
  const user = await User.findOne({ _id: userId });
  if (!user.admin) {
    throw new Forbidden("You are not authorized to access this route");
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
