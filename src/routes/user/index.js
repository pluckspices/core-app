const express = require("express");
const { body } = require("express-validator");
const UserController = require("../../controllers/user");

const router = express.Router();

//owned users - clients
router.post(
  "/owned/signup",
  [
    body("userEmail").exists().isEmail().normalizeEmail(),
    body("userPassword").exists().isLength({ min: 8 }),
    body("auctioneerUID").exists().isLength({ max: 3 }),
  ],
  UserController.owneduserSignUp
);
router.post(
  "/owned/login",
  [
    body("userEmail").exists().isEmail().normalizeEmail(),
    body("userPassword").exists().isLength({ min: 8 }),
    body("auctioneerUID").exists().isLength({ max: 3 }),
  ],
  UserController.owneduserSignUp
);

//member users(future potential) - members of client

//member admin(future potential) - site admin
module.exports = router;
