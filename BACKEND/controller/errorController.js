const AppError = require("./../utils/appError");

//
//
//
// ///   errors come when a user authenticate himself , FOr a secured Route
const handleJWTError = () =>
  new AppError("Invalid token , PLEASE try again later", 401);

const handleExpiredError = () =>
  new AppError("Token is Expired, TRy to login Again  ", 401);

// /////     ERRORS COME when routing with tours
const handleCastErrorDB = (err) => {
  const message = `👎 Invalid ${err.path}: ${err.value}.`;
  // const message = `👎 Invalid ${err.path}`;
  console.log(message);
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  let message;
  console.log("EC=>", typeof err.keyPattern);
  if (
    JSON.stringify(err.keyPattern) ==
    JSON.stringify({ retailer: 1, wholesaler: 1 })
  ) {
    message = `👎 Comment  already exist,   Please Update it `;
  } else {
    message = `👎 Field : ${Object.keys(
      err.keyPattern
    )} already exist,   Please Try another `;
  }

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  // const message = `👎 Invalid input data. ${errors.join(". ")}`;
  const errMessage = err.message.split(":")[1];
  const message = `👎 Invalid input data. ${errMessage}`;
  return new AppError(message, 400);
};
//
//
//
//

const sendErrorDev = (err, res) => {
  res.status(err.statusCode || 400).json({
    status: err.status || "FAILED",
    nothing: "just check",
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  console.log("sendErrorProd, EC=>", err.message);

  if (err.isOperational) {
    res.status(err.statusCode || 400).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(508).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  console.log("Ec=> ❌", err.message);
  if (process.env.NODE_ENV === "development") {
    console.log("DEVELOPMENT");
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV == "production") {
    console.log("🎇PRODUCTION🔥");

    let error = err;

    if (error.name === "CastError") error = handleCastErrorDB(error); /// INVALID  id
    if (error.code === 11000) error = handleDuplicateFieldsDB(error); /// DUPLICATE databse  when create new tour
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);

    // // IN AUTHENTICATION
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleExpiredError();

    //
    sendErrorProd(error, res);
  }
};
