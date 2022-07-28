const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.createOne = (Model) =>
  catchAsync(async function (req, res, next) {
    const doc = await Model.create(req.body);

    if (Object.keys(doc).length === 0) {
      return next(
        new AppError(`Unable to create ${Model},Please try again later`, 400)
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

exports.getAll = (Model) =>
  catchAsync(async function (req, res, next) {
    let filter = {};
    if (req.params.retailerId) filter = { retailer: req.params.retailerId };
    console.log("filter., fh", filter);

    const doc = await Model.find(filter);

    res.status(200).json({
      status: "SUCCESS",
      length: doc.length,
      data: {
        doc,
      },
    });
  });

// Comment, retailer,wholesaler
exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log("❌🧯㊗😋");

    let id;
    if (req.params.id) id = req.params.id;
    if (!req.params.id) id = req.user._id;

    if (!id) {
      return next(new AppError("Unable to get the user", 404));
    }

    console.log("❌🧯㊗😋", id);

    const doc = await Model.findById(id);

    res.status(200).json({
      status: "SUCCESS",
      data: {
        doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async function (req, res, next) {
    if (!req.params.id) {
      return next(new AppError("Unable to find the user", 404));
    }

    const doc = await Model.findByIdAndUpdate(req.params.id, { active: false });

    if (!doc) {
      return next(new AppError(`this doesn't exist`), 404);
    }
    res.status(200).json({
      status: "SUCCESS",
      data: {
        doc,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async function (req, res, next) {
    console.log("fh=>", req.body, req.params);

    if (!req.params.id) req.params.id = req.body.id;

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body);

    if (!doc) {
      return next(new AppError(`this id doesn't exist`, 404));
    }
    res.status(200).json({
      status: "SUCCESS",
      data: {
        doc,
      },
    });
  });
