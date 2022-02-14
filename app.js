require("dotenv").config();
require("express-async-errors");

//variables
const express = require("express");
const app = express();
const connect = require("./db/connect_db");
// const morgan = require("morgan");
const itemRoute = require("./routes/item-route");
const authRoute = require("./routes/auth-route");
const userRoute = require("./routes/user-route");
const ordersRoute = require("./routes/orders-route");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

//middlewares
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
// app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(xss());

//routes
app.use("/api/v1/footwears", itemRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/orders", ordersRoute);

//error-handlers
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
