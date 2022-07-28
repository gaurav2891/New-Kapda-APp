const express = require("express");

const commentRoute = require("./commentRoute");
const retailerController = require("./../controller/retailerController");
const authController = require("./../controller/authController");

const router = express.Router();

// router.use(authController.isLoggedIn);

router.use("/:retailerId/comment", commentRoute);

router
  .route("/")
  .get(retailerController.getAllRetailer)
  .post(
    retailerController.checkCreateRetailer,
    retailerController.createRetailer
  );

router
  .route("/:id")
  .get(retailerController.getRetailer)
  .patch(retailerController.updateRetailer)
  .delete(retailerController.deleteRetailer);

// ???? //////////   ADMIN SECURE ROUTE

router.get("/comment/:retailerId?", retailerController.getSecretcommets);

module.exports = router;
