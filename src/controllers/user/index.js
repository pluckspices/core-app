const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const OwnedUser = require("../../models/user");

exports.owneduserSignUp = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Please check the fields!");
    error.details = { planterURN: planter.planterURN };
    error.statusCode = 422;
    throw error;
  }
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;
  const auctioneerUID = req.body.auctioneerUID;

  OwnedUser.findOne({
    userEmail: userEmail,
    auctioneerUID: auctioneerUID,
  }).then((user) => {
    if (user) {
      const error = new Error("user with this email allready exists!!");
      error.statusCode = 401;
      throw error;
    }
    bcrypt
      .hash(userPassword, 12)
      .then((hashpassword) => {
        const ownedUser = new OwnedUser({
          userEmail: userEmail,
          userPassword: hashpassword,
          auctioneerUID: auctioneerUID,
        });
        return ownedUser.save();
      })
      .then((result) => {
        res.status(201).json({ message: "User created!", userId: result._id });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.message = "Internal server error!";
          err.statusCode = 500;
        }
        next(err);
      });
  });
};

exports.ownedUserLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Please check the fields!");
    error.details = { planterURN: planter.planterURN };
    error.statusCode = 422;
    throw error;
  }
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;
  const auctioneerUID = req.body.auctioneerUID;

  OwnedUser.findOne({ userEmail: userEmail, auctioneerUID: auctioneerUID })
    .then((user) => {
      if (!user) {
        const error = new Error(
          "A user with this email/AUIN could not be found!"
        );
        error.statusCode = 409;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(userPassword, loadedUser.userPassword);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Incorrect password!!");
        error.statusCode = 401;
        throw error;
      }
      const secret = process.env.COREAPP_DB_PROVIDER;
      const token = jwt.sign(
        {
          userEmail: userEmail,
        },
        secret,
        { expiresIn: "30m" }
      );
      res.send({
        token: token,
        auctioneerUID: loadedUser.auctioneerUID,
        userId: loadedUser._id.toString(),
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.message = "Internal server error!";
        err.statusCode = 500;
      }
      next(err);
    });
};
