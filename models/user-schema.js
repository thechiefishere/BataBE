const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide your first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide your last name"],
    },
    phone: {
      type: Number,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: [true, "Please provide email address"],
      lowercase: true,
      unique: true,
      match: [
        /^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.+!%-]{1,64}|)|\"[a-zA-Z0-9.+!% -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    tokens: {
      type: [Object],
    },
    orders: {
      type: [{ type: mongoose.Types.ObjectId, ref: "Order" }],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (providedPassword) {
  const isMatch = await bcryptjs.compare(providedPassword, this.password);
  return isMatch;
};

userSchema.methods.createJWT = async function () {
  const token = await jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
