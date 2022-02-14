const User = require("../models/user-schema");
const { BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const signup = async (req, res) => {
  const user = await User.create({
    ...req.body,
    email: req.body.email.toLowerCase(),
  });

  const token = await user.createJWT();
  user.tokens.push({ token, signedAt: Date.now() });
  await user.save();

  res.status(StatusCodes.CREATED).json({ status: "success", token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new BadRequestError("There is no user with the email provided");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new BadRequestError("Incorrect password");
  }

  const token = await user.createJWT();
  user.tokens.push({ token, signedAt: Date.now() });
  user.tokens = user.tokens.filter((token) => {
    const timeDiff = (Date.now() - token.signedAt) / 1000;
    if (timeDiff < 432000) {
      return token;
    }
  });
  await user.save();
  await res.status(StatusCodes.ACCEPTED).json({ status: "success", token });
};

const logout = async (req, res) => {
  const { token, userId } = req.user;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new BadRequestError("The user does not exist");
  }
  user.tokens = user.tokens.filter((t) => {
    return t.token != token;
  });
  await user.save();
  res.status(StatusCodes.OK).json({ status: "success", msg: "Logged Out" });
};

module.exports = {
  login,
  signup,
  logout,
};
