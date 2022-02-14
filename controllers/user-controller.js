const User = require("../models/user-schema");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const getUsers = async (req, res) => {
  const users = await User.find({}).populate("orders");
  res.status(StatusCodes.OK).json({ status: "success", users });
};

const deleteUsers = async (req, res) => {
  await User.deleteMany({});
  res
    .status(StatusCodes.OK)
    .json({ status: "success", msg: "All users deleted" });
};

const getSingleUserAdmin = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new NotFoundError("User does not exist");
  }
  res.status(StatusCodes.OK).json({ status: "success", user });
};

const updateSingleUserAdmin = async (req, res) => {
  const { userId } = req.params;
  const { admin } = req.body;
  const update = {};
  if (admin) {
    update.admin = admin;
  }
  const user = await User.findOneAndUpdate({ _id: userId }, update, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw new NotFoundError("User does not exist");
  }
  res.status(StatusCodes.OK).json({ status: "success", user });
};

const deleteSingleUserAdmin = async (req, res) => {
  const { userId } = req.params;
  await User.findOneAndDelete({ _id: userId });
  if (!user) {
    throw new NotFoundError("User does not exist");
  }
  res.status(StatusCodes.OK).json({ status: "success", msg: "User deleted" });
};

const getSingleUser = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findOne({ _id: userId });
  res.status(StatusCodes.OK).json({ status: "success", user });
};

const updateUser = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ status: "success", user });
};

module.exports = {
  getUsers,
  deleteUsers,
  getSingleUser,
  getSingleUserAdmin,
  deleteSingleUserAdmin,
  updateSingleUserAdmin,
  updateUser,
};
