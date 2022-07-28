const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("./../utils/appError");

const Wholesaler = require("./../models/wholesalerModel");
const Comment = require("./../models/commentModel");
const factory = require("./factoryHandler");
const catchAsync = require("./../utils/catchAsync");

const genrateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const createSendToken = (token_data, statusCode, res) => {
  const token = genrateToken(token_data);
  console.log(token);
  return res.status(statusCode).json({
    status: "SUCCESS",
    message: "Welcome to KAPDA BAZAR",
    token,
  });
};

//
//

exports.getMe = catchAsync(async (req, res, next) => {
  const currentUser = await Wholesaler.findById(req.user._id);
  console.log("❌🧯㊗ GET ME 😋");

  if (!currentUser) {
    return next(new AppError("User Didn't found", 404));
  }
  res.status(200).json({
    status: "SUCCESS",
    currentUser,
  });
});
// exports.getMe = catchAsync(async (req, res, next) => {
//   console.log("❌🧯㊗😋");

//   let id;
//   if (req.params.id) id = req.params.id;
//   if (!req.params.id) id = req.user._id;

//   if (!id) {
//     return next(new AppError("Unable to get the user", 404));
//   }

//   console.log("❌🧯㊗😋", id);

//   const doc = await Wholesaler.findById(id);
//   console.log("❌🧯㊗😋", doc);

//   res.status(200).json({
//     status: "SUCCESS",
//     data: {
//       doc,
//     },
//   });
// });

exports.updateMe = catchAsync(async (req, res, next) => {
  const { name, mobileNumber, landMark, whatsappNumber, address } = req.body;

  if (!name || !mobileNumber || !whatsappNumber || !address || !landMark) {
    return next(new AppError("Please provide data", 400));
  }

  const updatedWholesaler = await Wholesaler.findByIdAndUpdate(req.user._id, {
    name,
    mobileNumber,
    landMark,
    whatsappNumber,
    address,
  });

  if (!updatedWholesaler) {
    return next(new AppError("Unable to update WHolesaer"), 200);
  }

  createSendToken(req.user._id, 200, res);
});

exports.getMyComments = catchAsync(async (req, res, next) => {
  if (!req.user._id) {
    return next(new AppError("Unable to get User ", 404));
  }

  if (!req.params.wholesalerId) req.params.wholesalerId = req.user._id;

  const allComment = await Comment.find({
    wholesaler: req.params.wholesalerId,
  }).populate({
    path: "retailer",
    select: "firmName",
  });

  res.status(200).json({
    status: "SUCCESS",
    length: allComment.length,
    data: {
      allComment,
    },
  });
});

exports.updateMyPassword = catchAsync(async (req, res, next) => {
  const { oldPassword, newPassword, newPasswordConfirm } = req.body;

  if ((!oldPassword, !newPassword, !newPasswordConfirm))
    return next(new AppError("Please enter  password", 400));

  const wholesaler = await Wholesaler.findById(req.user._id).select(
    "+password"
  );

  if (
    !wholesaler ||
    !(await wholesaler.checkPassword(oldPassword, wholesaler.password))
  ) {
    return next(new AppError(`INCORRECT OLD PASSWORD `, 400));
  }

  wholesaler.password = newPassword;
  wholesaler.confirmPassword = newPasswordConfirm;
  console.log("UPDATE MY PASSWORD=><<<", wholesaler);

  await wholesaler.save();

  console.log("update=>", wholesaler);

  createSendToken(wholesaler._id, 200, res);
});

//  BY ADMIN
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You are not authorised to access this role"));
    }
    next();
  };
};
exports.getAllWholesaler = factory.getAll(Wholesaler);
exports.updateWholesalerByAdmin = factory.updateOne(Wholesaler);

exports.updatePassByAdmin = catchAsync(async (req, res, next) => {
  console.log(req.body);

  const { newPassword, newPasswordConfirm } = req.body;
  const id = req.params.wholesalerId;
  console.log("id =>", id);

  if ((!newPassword, !newPasswordConfirm)) {
    return next(
      new AppError("please enter newPassword and newPasswordConfirm", 404)
    );
  }

  const wholesaler = await Wholesaler.findById(id);

  if (!wholesaler) {
    return next(new AppError("unable to find the Wholesaler", 404));
  }

  wholesaler.password = newPassword;
  wholesaler.confirmPassword = newPasswordConfirm;

  await wholesaler.save();

  createSendToken(wholesaler._id, 200, res);
});

//
// EXTRA //
//
exports.turnOffwholesaler = catchAsync(async (req, res, next) => {
  if (!req.params.id) req.params.id = req.user._id;

  const updatedUser = await Wholesaler.findOneAndUpdate(
    { firmName: req.user.firmName },
    { active: false }
  );

  if (!updatedUser) {
    return next(new AppError("user can't be updated", 404));
  }

  res.status(200).json({ status: "SUCCESS", user: updatedUser });
});
