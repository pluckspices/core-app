const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const ApplicationUser = require("../../models/auth");

exports.userSignUp = (req, res, next) => {
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;
  if (!userEmail && !userPassword) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  } else {
    bcrypt.hash(userPassword, 12).then((hashpassword) => {
      ApplicationUser.create(userEmail, hashpassword, (err, data) => {
        if (err) {
          if (err.kind === "DUP_ENTRY") {
            res.status(409).send({
              message: "User already exists",
              userEmail: userEmail,
            });
          } else {
            res.status(500).send({
              message: "Some error occurred while creating the Auction",
            });
          }
        } else res.send(data);
      });
    });
  }
};

exports.userSignIn = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({
      message: `Please provide valid credentials!`,
    });
  }
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;
  if (!userEmail && !userPassword) {
    res.status(400).send({
      message: "Username and Password are required!",
    });
  } else {
    ApplicationUser.login(userEmail, (err, data) => {
      if (err) {
        if (err.kind === "NO_USER") {
          res.status(401).send({
            message: "Incorrect Username!",
          });
        } else {
          res.status(500).send({
            message: "Some error occurred",
          });
        }
      } else {
        let hash = data[0].userPassword;
        if (!bcrypt.compareSync(userPassword, hash)) {
          res.status(401).send({
            message: "Incorrect Password!",
          });
        } else {
          const token = jwt.sign(
            {
              email: userEmail,
            },
            "nithin",
            { expiresIn: "1h" }
          );
          res.send({
            token: token,
          });
        }
      }
    });
  }
};
