const Auction = require("../../models/auction");

exports.createAuction = (req, res, next) => {
  const auctionDate = req.body.auctionDate;
  const auctionSession = req.body.auctionSession;
  const auctioneerUIC = req.body.auctioneerUIC;
  let financialYear;
  let auctionSessionCode;
  const dateofAuction = new Date(auctionDate);
  let dayOfAuction = String(dateofAuction.getDate());
  let monthOfAuction = String(dateofAuction.getMonth() + 1);
  if (dayOfAuction.length === 1) {
    dayOfAuction = `0${dayOfAuction}`;
  }
  if (monthOfAuction.length === 1) {
    monthOfAuction = `0${monthOfAuction}`;
  }
  if (dateofAuction.getMonth() + 1 <= 3) {
    let previousYear = String(dateofAuction.getFullYear() - 1);
    let currentYear = String(dateofAuction.getFullYear());
    financialYear = previousYear.substr(2, 2) + "" + currentYear.substr(2, 2);
  } else {
    let currentYear = String(dateofAuction.getFullYear());
    let nextYear = String(dateofAuction.getFullYear() + 1);
    financialYear = currentYear.substr(2, 2) + "" + nextYear.substr(2, 2);
  }
  switch (auctionSession) {
    case 91:
      auctionSessionCode = "M";
      break;
    case 92:
      auctionSessionCode = "P";
      break;
    default:
      break;
  }
  const auctionNumber = `${auctioneerUIC}${financialYear}${auctionSessionCode}${dayOfAuction}${monthOfAuction}`;
  Auction.findOne({ auctionId: auctionNumber })
    .then((auction) => {
      if (auction) {
        const error = new Error("Auction already exists.");
        error.details = { auctionId: auction.auctionId };
        error.statusCode = 409;
        throw error;
      }
      const auctionRegestration = new Auction({
        auctionId: auctionNumber,
        auctionDate: auctionDate,
        sessionId: auctionSession,
      });
      return auctionRegestration.save();
    })
    .then((result) => {
      res
        .status(201)
        .send({ message: "Auction created!", auctionId: result.auctionId });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.message = "Internal server error!";
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.auctionHolding = (req, res, next) => {
  Auction.find({ statusId: { $ne: 15 } })
    .then((auctions) => {
      if (!auctions) {
        const error = new Error("Could not found Auction holdings!");
        error.statusCode = 404;
        throw error;
      }
      res
        .status(200)
        .json({ message: "Auctions fetched.", auctions: auctions });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.message = "Internal server error!";
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.auctionHistory = (req, res, next) => {
  Auction.find({ statusId: { $in: [15] } })
    .then((auctions) => {
      if (!auctions) {
        const error = new Error("Could not found Auctions history!");
        error.statusCode = 404;
        throw error;
      }
      res
        .status(200)
        .json({ message: "Auctions fetched.", auctions: auctions });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.message = "Internal server error!";
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateAuction = (req, res, next) => {
  const auctionId = req.params.auctionId;
  const auctionStatus = req.body.auctionStatus;
  const auctionDate = req.body.auctionDate;
  const auctionSession = req.body.auctionSession;
  Auction.findOne({ auctionId: auctionId })
    .then((auction) => {
      if (!auction) {
        const error = new Error("Could not found Auction!");
        error.statusCode = 404;
        error.details = { auctionId: auction.auctionId };
        throw error;
      }
      auction.statusId = auctionStatus;
      auction.auctionDate = auctionDate;
      auction.sessionId = auctionSession;
      auction.updatedOn = Date.now();
      return auction.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Auction was updated successfully!",
        auctionId: result.auctionId,
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

exports.deleteAuction = (req, res, next) => {
  const auctionId = req.params.auctionId;
  Auction.findOne({ auctionId: auctionId })
    .then((auction) => {
      if (!auction) {
        const error = new Error("Could not found Auction!");
        error.statusCode = 404;
        error.details = { auctionId: auction.auctionId };
        throw error;
      }
      return auction.remove();
    })
    .then((result) => {
      res.status(200).json({
        message: "Auction was deleted successfully!!",
        auctionId: result.auctionId,
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
