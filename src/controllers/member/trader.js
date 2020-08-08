const Trader = require("../../models/member/trader");
const CodeGenerator = require("../../middleware/unique-code");

exports.createTrader = (req, res, next) => {
  const traderName = req.body.traderName;
  const address = req.body.address;
  const tinNo = req.body.tinNo;
  const cstNo = req.body.cstNo;
  const spicesBoardLicence = req.body.spicesBoardLicence;
  const shortName = req.body.shortName;
  const auctioneerUIC = req.body.auctioneerUIC;
  const memberType = "TR";
  const traderURN = auctioneerUIC + memberType + CodeGenerator.uniqueCode();

  Trader.findOne({ traderURN: traderURN })
    .then((trader) => {
      if (trader) {
        const error = new Error("Trader already exists.");
        error.details = { traderURN: trader.traderURN };
        error.statusCode = 409;
        throw error;
      }
      const traderRegestration = new Trader({
        traderURN: traderURN,
        traderName: traderName,
        address: address,
        tinNo: tinNo,
        cstNo: cstNo,
        spicesBoardLicence: spicesBoardLicence,
        shortName: shortName,
      });
      return traderRegestration.save();
    })
    .then((result) => {
      res
        .status(201)
        .send({ message: "Trader created!", traderURN: result.traderURN });
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

exports.tradersDetails = (req, res, next) => {
  Trader.find()
    .then((traders) => {
      if (!traders) {
        const error = new Error("Could not found Traders!");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "Traders fetched.", traders: traders });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateTrader = (req, res) => {
  const traderURN = req.params.traderURN;
  const traderName = req.body.traderName;
  const address = req.body.address;
  const tinNo = req.body.tinNo;
  const cstNo = req.body.cstNo;
  const spicesBoardLicence = req.body.spicesBoardLicence;
  const shortName = req.body.shortName;

  Trader.findOne({ traderURN: traderURN })
    .then((trader) => {
      if (!trader) {
        const error = new Error("Could not found Trader!");
        error.statusCode = 404;
        error.details = { traderURN: trader.traderURN };
        throw error;
      }
      trader.traderName = traderName;
      trader.address = address;
      trader.tinNo = tinNo;
      trader.cstNo = cstNo;
      trader.spicesBoardLicence = spicesBoardLicence;
      trader.shortName = shortName;
      trader.updatedOn = Date.now();
      return trader.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Trader was updated successfully!",
        traderURN: result.traderURN,
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

exports.deleteTrader = (req, res) => {
  const traderURN = req.params.traderURN;
  Trader.findOne({ traderURN: traderURN })
    .then((trader) => {
      if (!trader) {
        const error = new Error("Could not found Trader!");
        error.statusCode = 404;
        error.details = { traderURN: trader.traderURN };
        throw error;
      }
      return trader.remove();
    })
    .then((result) => {
      res.status(200).json({
        message: "Trader was deleted successfully!!",
        traderURN: result.traderURN,
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
