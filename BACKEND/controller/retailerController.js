const express = require("express");
const Retailer = require("./../models/retailerModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Comment = require("./../models/commentModel");
const factory = require("./factoryHandler");

exports.getAllRetailer = catchAsync(async function (req, res, next) {
  console.log(req.user.clothCategory.startsWith("k"));
  let doc = await Retailer.find();

  if (req.user.role === "gaurav") {
    doc = doc;
  } else if (req.user.clothCategory.startsWith("k")) {
    doc = doc.filter((retailer) => retailer.clothCategory.startsWith("k"));
  } else if (req.user.clothCategory.startsWith("r")) {
    doc = doc.filter((retailer) => retailer.clothCategory.startsWith("r"));
  }

  doc = doc.filter((retailer) => retailer.active != false);

  res.status(200).json({
    status: "SUCCESS",
    length: doc.length,
    data: {
      doc,
    },
  });
});

exports.getRetailer = catchAsync(async (req, res, next) => {
  console.log("RC=>", req.params.id);

  const Comments = await Comment.find({ retailer: req.params.id });

  const retailer = await Retailer.findById(req.params.id);
  const obj = { retailer, Comments };

  res.status(200).json({
    status: "SUCCESS",
    data: {
      obj,
    },
  });
});

exports.checkCreateRetailer = catchAsync(async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new AppError("Please Provide Retailer Details", 400));
  }

  const retailerData = {
    district: req.body.district.toLowerCase().trim(),
    firmName: req.body.firmName.toLowerCase().trim(),
    location: req.body.location.toLowerCase().trim(),
    name: req.body.name,
    state: req.body.state,
    clothCategory: req.body.clothCategory,
  };

  console.log(retailerData);
  next();
});
exports.createRetailer = factory.createOne(Retailer);
exports.updateRetailer = factory.updateOne(Retailer);
exports.deleteRetailer = factory.deleteOne(Retailer);

//
//
//
//
//
// ADMIN PANEL

exports.getSecretcommets = catchAsync(async (req, res, next) => {
  console.log("SECRET COMMENT=>", req.params.retailerId);
  if (!req.user._id) {
    return next(new AppError("Unable to get User ", 404));
  }

  let filter = {};
  if (!req.params.retailerId) filter = {};
  if (req.params.retailerId) filter = { retailer: req.params.retailerId };

  const allComment = await Comment.find(filter).populate({
    path: "wholesaler",
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
