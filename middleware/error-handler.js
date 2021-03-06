const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong, please try again later...",
  };

  return res
    .status(customError.statusCode)
    .json({ status: "fail", msg: customError.message });
};

module.exports = errorHandler;
