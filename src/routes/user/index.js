const express = require("express");
const { body } = require("express-validator");
const UserController = require("../../controllers/user");

const router = express.Router();

//owned users - clients
router.post(
  "/owned/signup",
  [
    body("userEmail").isEmail().normalizeEmail(),
    body("userPassword").isLength({ min: 8 }),
  ],
  UserController.userSignUp
);
router.post(
  "/owned/login",
  [
    body("userEmail").isEmail().normalizeEmail(),
    body("userPassword").isLength({ min: 8 }),
  ],
  UserController.userLogin
);

//member users(future potential) - members of client

//member admin(future potential) - site admin
module.exports = router;
