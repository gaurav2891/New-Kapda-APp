const Wholesaler = require("./../models/wholesalerModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const genrateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};
console.log("hello");

const createSendToken = (token_data, statusCode, res) => {
  const token = genrateToken(token_data);
  console.log(token);
  return res.status(statusCode).json({
    status: "SUCCESS",
    message: "Welcome to KAPDA BAZAR",
    token,
  });
};

exports.signUp = catchAsync(async function (req, res, next) {
  console.log(req.body);
  if (
    !req.body.name ||
    !req.body.firmName ||
    !req.body.address ||
    !req.body.landMark ||
    !req.body.mobileNumber ||
    !req.body.whatsappNumber ||
    !req.body.password ||
    !req.body.confirmPassword ||
    !req.body.clothCategory
  ) {
    return next(new AppError("Please Enter Details"), 404);
  }

  const signUpData = {
    name: req.body.name.toLowerCase().trim(),
    firmName: req.body.firmName.toLowerCase().trim(),
    address: req.body.address.toLowerCase().trim(),
    landMark: req.body.landMark.toLowerCase().trim(),
    mobileNumber: req.body.mobileNumber,
    whatsappNumber: req.body.whatsappNumber,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    clothCategory: req.body.clothCategory.toLowerCase().trim(),
  };

  const createWholsaler = await Wholesaler.create(signUpData);

  console.log("createWholsaler=>", createWholsaler);

  if (!createWholsaler) {
    return next(new AppError("unable to signup now , Please try again later"));
  }

  createSendToken(createWholsaler._id, 200, res);
});

exports.login = catchAsync(async function (req, res, next) {
  console.log("AC+>", req.body);
  const { firmName, password } = {
    firmName: req.body.firmName.toLowerCase().trim(),
    password: req.body.password,
  };
  if (!password || !firmName) {
    return next(new AppError("PLease enter FirmName and Password", 404));
  }

  const user = await Wholesaler.findOne({ firmName }).select("+password");

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError(`Please Check firmName and password`, 404));
  }
  const tokenData = {
    firmName: req.body.firmName,
    id: user._id,
  };
  console.log("user, AC=>", user);

  if (user.active === false) {
    return next(new AppError("You are not verified yet , Try Again", 400));
  }

  createSendToken(tokenData, 200, res);
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.includes("Bearer")
  ) {
    token = req.headers.authorization.split("Bearer ")[1];
  } else {
    return next(new AppError("PLease provide Token", 400));
  }

  if (!token) {
    return next(
      new AppError("you are not loggedIn. Please login to get access", 404)
    );
  }

  let verify = promisify(jwt.verify);
  const decoded = await verify(token, process.env.JWT_SECRET);

  const currentUser = await Wholesaler.findById(decoded.id.id);

  if (!currentUser) {
    return next(new AppError("User Didn't found", 404));
  }

  if (currentUser.active == false) {
    return next(new AppError("You are not verified yet , Try Again", 400));
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  req.user = currentUser;
  next();
});
