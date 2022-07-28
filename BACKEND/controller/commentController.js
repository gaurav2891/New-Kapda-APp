const Comment = require("./../models/commentModel");
const factory = require("./factoryHandler");

const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getUserId = catchAsync(async (req, res, next) => {
  console.log("=>>>😀😀😀😀😀😀😀😀😀😀😀😀😀.", req.user);
  if (!req.user._id || !req.params.retailerId) {
    return next(new AppError("Unable to get user", 404));
  }

  console.log("=>>>", req.user._id);
  if (!req.body.wholesaler) req.body.wholesaler = req.user._id;
  if (!req.body.retailer) req.body.retailer = req.params.retailerId;
  next();
});

exports.getReqBodyWRComment = catchAsync(async (req, res, next) => {
  const body = {
    wholesaler: req.body.wholesaler,
    retailer: req.body.retailer,
  };
  req.find = body;
  next();
});

exports.getNewComment = catchAsync(async (req, res, next) => {
  let lastDate = new Date().setDate(new Date().getDate() - 1);
  lastDate = new Date(lastDate);

  let filter = {
    date: { $gte: lastDate },
    clothCategory: req.user.clothCategory,
    wholesaler: { $ne: req.user._id },
  };

  let newComment = await Comment.find(filter).populate({
    path: "retailer",
    select: "name firmName",
  });

  console.log("=> filter ", new Date(), filter, newComment);

  res.status(200).json({
    status: "SUCCESS",
    comments: newComment.length,
    data: {
      newComment,
    },
  });
});

exports.createWRComment = catchAsync(async (req, res, next) => {
  if (!req.body) {
    return next(new AppError("NO COMMENT ADDED", 400));
  }

  req.body.comment = req.body.comment.trim();
  req.body.clothCategory = req.user.clothCategory;

  console.log("Comment added", req.body);
  const doc = await Comment.create(req.body);

  if (!doc) {
    return next(
      new AppError("unable to create comment,Please try again later", 400)
    );
  }
  console.log(doc);
  res.status(200).json({
    status: "SUCCESS",
    data: {
      doc,
    },
  });
});

exports.getWRComment = catchAsync(async (req, res, next) => {
  let WRComment = await Comment.findOne(req.find);

  if (WRComment == null) {
    WRComment = 0;
  } else if (!WRComment) {
    return next(
      new AppError("Unable to get comment,Please try again later", 400)
    );
  }

  res.status(200).json({
    status: "SUCCESS",
    data: WRComment,
  });
});

exports.updateWRComment = catchAsync(async (req, res, next) => {
  // if(req.body.like == undefined) null
  // if(req.body.dislike == undefined) null

  // let like_dislike = {

  // }

  const newBody = {
    comment: req.body.comment.trim(),
    wholesalerId: req.body.wholesaler,
    retailerId: req.body.retailer,
    date: new Date(),
    like: req.body.like,
    dislike: req.body.dislike,
  };

  const WRComment = await Comment.findOneAndUpdate(req.find, newBody);
  console.log("😀😀🤣🤣🤣🤣", newBody, WRComment);

  if (!WRComment) {
    return next(
      new AppError("Unable to update comment,Please try again later", 400)
    );
  }

  res.status(200).json({
    status: "SUCCESS",
    data: {
      WRComment,
    },
  });
});

exports.deleteWRComment = catchAsync(async (req, res, next) => {
  const doc = await Comment.findOneAndDelete(req.find);

  if (!doc) {
    return next(
      new AppError("Unable to delete comment,Please try again later", 400)
    );
  }

  res.status(200).json({
    status: "SUCCESS",
    Comment: "DELETED",
    data: {
      doc,
    },
  });
});

exports.allComment = factory.getAll(Comment);
