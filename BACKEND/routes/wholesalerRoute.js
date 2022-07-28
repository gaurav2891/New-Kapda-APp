const mongoose = require("mongoose");
const express = require("express");
const authController = require("./../controller/authController");
const commentRoute = require("./../routes/commentRoute");

const wholesalerController = require("./../controller/wholesalerController");
const { route } = require("./retailerRoute");
const router = express.Router();

router
  .route("/")
  .get(wholesalerController.getMe)
  .patch(wholesalerController.updateMe);
router.patch("/updateMyPassword", wholesalerController.updateMyPassword);

router.get("/comment/:wholesalerId?", wholesalerController.getMyComments);

//
//
//
//  BY ADMIN
router.use(wholesalerController.restrictTo("admin", "gaurav"));
router.patch("turnOff", wholesalerController.turnOffwholesaler);
router
  .route("/admin")
  .get(wholesalerController.getAllWholesaler)
  .patch(wholesalerController.updateWholesalerByAdmin);
router.patch(
  "/:wholesalerId/updatePassByAdmin",
  wholesalerController.updatePassByAdmin
);

module.exports = router;
