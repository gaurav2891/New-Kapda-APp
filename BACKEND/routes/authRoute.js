const express = require("express");
const authController = require("../controller/authController");

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.get("/isLoggedIn", authController.isLoggedIn);

//  BY ADMIN

module.exports = router;
