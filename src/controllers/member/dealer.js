const Dealer = require("../../models/member/dealer");
const CodeGenerator = require("../../middleware/unique-code");

exports.createDealer = (req, res, next) => {
  const dealerName = req.body.dealerName;
  const address = req.body.address;
  const phoneNumber = req.body.phoneNumber;
  const auctioneerUIC = req.body.auctioneerUIC;
  const memberType = "DL";
  const dealerURN = auctioneerUIC + memberType + CodeGenerator.uniqueCode();

  Dealer.findOne({ dealerURN: dealerURN })
    .then((dealer) => {
      if (dealer) {
        const error = new Error("Dealer already exists.");
        error.details = { dealerURN: dealer.dealerURN };
        error.statusCode = 409;
        throw error;
      }
      const dealerRegestration = new Dealer({
        dealerURN: dealerURN,
        dealerName: dealerName,
        address: address,
        phoneNumber: phoneNumber,
      });
      return dealerRegestration.save();
    })
    .then((result) => {
      res
        .status(201)
        .send({ message: "Dealer created!", dealerURN: result.dealerURN });
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

exports.dealerDetails = (req, res, next) => {
  Dealer.find()
    .then((dealers) => {
      if (!dealers) {
        const error = new Error("Could not found Dealers!");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "Dealers fetched.", dealers: dealers });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.message = "Internal server error!";
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.dealersSearch = (req, res, next) => {
  const searchKey = req.params.searchKey;
  Dealer.find({
    $or: [
      { dealerURN: { $regex: `.*${searchKey}.*`, $options: "i" } },
      { dealerName: { $regex: `.*${searchKey}.*`, $options: "i" } },
    ],
  })
    .then((dealers) => {
      if (!dealers) {
        const error = new Error("Could not found Dealers!");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "Dealers fetched.", dealers: dealers });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.message = "Internal server error!";
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateDealer = (req, res) => {
  const dealerURN = req.params.dealerURN;
  const dealerName = req.body.dealerName;
  const phoneNumber = req.body.phoneNumber;
  const address = req.body.address;
  Dealer.findOne({ dealerURN: dealerURN })
    .then((dealer) => {
      if (!dealer) {
        const error = new Error("Could not found Dealer!");
        error.statusCode = 404;
        error.details = { dealerURN: dealer.dealerURN };
        throw error;
      }
      dealer.dealerName = dealerName;
      dealer.phoneNumber = phoneNumber;
      dealer.address = address;
      dealer.updatedOn = Date.now();
      return dealer.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Dealer was updated successfully!",
        dealerURN: result.dealerURN,
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

exports.deleteDealer = (req, res) => {
  const dealerURN = req.params.dealerURN;

  Dealer.findOne({ dealerURN: dealerURN })
    .then((dealer) => {
      if (!dealer) {
        const error = new Error("Could not found Dealer!");
        error.statusCode = 404;
        error.details = { dealerURN: dealer.dealerURN };
        throw error;
      }
      return dealer.remove();
    })
    .then((result) => {
      res.status(200).json({
        message: "Dealer was deleted successfully!!",
        dealerURN: result.dealerURN,
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
