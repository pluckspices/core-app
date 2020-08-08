const Planter = require("../../models/member/planter");
const CodeGenerator = require("../../middleware/unique-code");

exports.createPlanter = (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const crNumber = req.body.crNumber;
  const phoneNumber = req.body.phoneNumber;
  const address = req.body.address;
  const auctioneerUIC = req.body.auctioneerUIC;
  const memberType = "PL";
  const planterURN = auctioneerUIC + memberType + CodeGenerator.uniqueCode();

  Planter.findOne({ planterURN: planterURN })
    .then((planter) => {
      if (planter) {
        const error = new Error("Planter already exists.");
        error.details = { planterURN: planter.planterURN };
        error.statusCode = 409;
        throw error;
      }
      const planterRegestration = new Planter({
        planterURN: planterURN,
        firstName: firstName,
        lastName: lastName,
        crNumber: crNumber,
        address: address,
        phoneNumber: phoneNumber,
      });
      return planterRegestration.save();
    })
    .then((result) => {
      res
        .status(201)
        .send({ message: "Planter created!", planterURN: result.planterURN });
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.message = "Internal server error!";
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.plantersDetails = (req, res, next) => {
  Planter.find()
    .then((planters) => {
      if (!planters) {
        const error = new Error("Could not found Planters!");
        error.statusCode = 404;
        throw error;
      }
      res
        .status(200)
        .json({ message: "Planters fetched.", planters: planters });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.message = "Internal server error!";
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updatePlanter = (req, res) => {
  const planterURN = req.params.planterURN;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const crNumber = req.body.crNumber;
  const phoneNumber = req.body.phoneNumber;
  const address = req.body.address;
  
  Planter.findOne({ planterURN: planterURN })
    .then((planter) => {
      if (!planter) {
        const error = new Error("Could not found Planter!");
        error.statusCode = 404;
        error.details = { planterURN: planter.planterURN };
        throw error;
      }
      planter.firstName = firstName;
      planter.lastName = lastName;
      planter.crNumber = crNumber;
      planter.phoneNumber = phoneNumber;
      planter.address = address;
      planter.updatedOn = Date.now();
      return planter.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Planter was updated successfully!",
        planterURN: result.planterURN,
      });
    })
    .catch((err) => {
      console.error(err);
      if (!err.statusCode) {
        err.message = "Internal server error!";
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deletePlanter = (req, res) => {
  const planterURN = req.params.planterURN;
  Dealer.findOne({ planterURN: planterURN })
    .then((planter) => {
      if (!planter) {
        const error = new Error("Could not found Planter!");
        error.statusCode = 404;
        error.details = { planterURN: planter.planterURN };
        throw error;
      }
      return planter.remove();
    })
    .then((result) => {
      res.status(200).json({
        message: "Planter was deleted successfully!!",
        planterURN: result.planterURN,
      });
    })
    .catch((err) => {
      console.error(err);
      if (!err.statusCode) {
        err.message = "Internal server error!";
        err.statusCode = 500;
      }
      next(err);
    });
};
