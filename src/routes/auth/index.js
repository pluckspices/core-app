const express = require("express");
const { body } = require("express-validator");
const AuthController = require("../../controllers/auth");

const router = express.Router();

router.post("/user/siginup", AuthController.userSignUp);
router.post(
  "/user/login",
  [body("userEmail").isEmail()],
  AuthController.userSignIn
);

module.exports = router;
