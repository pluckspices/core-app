const Bidder = require("../../models/member/bidder");

exports.createBidder = (req, res, next) => {
  const bidderName = req.body.bidderName;
  const bidderCode = req.body.bidderCode;
  const bidderUID = "BID" + bidderCode;

  Bidder.findOne({ bidderCode: bidderUID })
    .then((bidder) => {
      if (bidder) {
        const error = new Error("Bidder already exists!");
        error.details = { bidderCode: bidder.bidderCode };
        error.statusCode = 409;
        throw error;
      }
      const bidderRegestration = new Bidder({
        bidderName: bidderName,
        bidderCode: bidderUID,
      });
      return bidderRegestration.save();
    })
    .then((result) => {
      res.status(201).send({
        message: "Bidder created sucessfully!",
        bidderCode: result.bidderCode,
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

exports.bidderDetails = (req, res, next) => {
  Bidder.find()
    .then((bidders) => {
      if (!bidders) {
        const error = new Error("Could not found Bidders!");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "Bidders fetched.", bidders: bidders });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.message = "Internal server error!";
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteBidder = (req, res) => {
  const bidderCode = req.params.bidderCode;
  
  Bidder.findOne({ bidderCode: bidderCode })
    .then((bidder) => {
      if (!bidder) {
        const error = new Error("Could not found Bidder!");
        error.statusCode = 404;
        error.details = { bidderCode: bidder.bidderCode };
        throw error;
      }
      return bidder.remove();
    })
    .then((result) => {
      res.status(200).json({
        message: "Bidder was deleted successfully!!",
        bidderCode: result.bidderCode,
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
