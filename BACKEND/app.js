const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const ratelimit = require("express-rate-limit");
const helmet = require("helmet");
const mongosanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const retailRoute = require("./routes/retailerRoute");
const commentRoute = require("./routes/commentRoute");
const wholesalerRoute = require("./routes/wholesalerRoute");
const authRoute = require("./routes/authRoute");
const globalErrorHandler = require("./controller/errorController");
const authController = require("./controller/authController");

const app = express();

app.use(cors());

//  HTTP HEADER MIDDLEWARE
app.use(helmet());

//
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//  RATE LIMITING MIDDLEWARE
const limiter = ratelimit({
  max: 100,
  windowsMs: 60 * 60 * 1000,
  message: "too many request from this IP , try after an hour",
});
// app.use("/api", limiter);

//  APP MIDDLEWARE
app.use(express.json());

app.use(mongosanitize());
app.use(xss());
app.use("/api/v1/accounts", authRoute);

app.use(authController.isLoggedIn);

app.use("/api/v1/wholesaler", wholesalerRoute);
app.use("/api/v1/retailer", retailRoute); //// => show all retailer , create new REtailer
app.use("/api/v1/comment", commentRoute);

app.all("*", (req, res, next) => {
  res.status(200).json({
    staus: "Fail",
    message: `can't find ${req.originalUrl} this URL on SERVER`,
  });
});

app.use(globalErrorHandler);

module.exports = app;
