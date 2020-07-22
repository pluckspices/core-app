const Auction = require("../../models/auctionmanager/auctionManager");

exports.createAuction = (req, res, next) => {
  let auctionDate = req.body.auctionDate;
  let auctionSession = req.body.auctionSession;
  let financialYear = "";
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
  let auctionNumber = `ABC${financialYear}DM${dayOfAuction}${monthOfAuction}S${auctionSession}`;
  Auction.create(
    auctionNumber,
    auctionDate,
    auctionSession,
    11,
    (err, data) => {
      if (err) {
        if (err.kind === "DUP_ENTRY") {
          res.status(409).send({
            message: "Auction already exists",
            auctionId: auctionNumber,
          });
        } else {
          res.status(500).send({
            message: "Some error occurred while creating the Auction",
          });
        }
      } else res.send(data);
    }
  );
};

exports.auctionHoldings = (req, res) => {
  Auction.getHoldings((err, data) => {
    if (err)
      res.status(500).send({
        message: "Some error occurred while retrieving Auction.",
      });
    else res.send(data);
  });
};

exports.auctionHistory = (req, res) => {
  Auction.getHistory((err, data) => {
    if (err)
      res.status(500).send({
        message: "Some error occurred while retrieving Auction.",
      });
    else res.send(data);
  });
};

exports.deleteAuction = (req, res) => {
  const auctionId = String(req.body.auctionId);
  Auction.delete(auctionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Auction Not found",
          auctionId: auctionId,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Auction",
          auctionId: auctionId,
        });
      }
    } else
      res.send({
        message: `Auction was deleted successfully!`,
        auctionId: auctionId,
      });
  });
};

exports.updateAuction = (req, res) => {
  const auctionId = String(req.body.auctionId);
  const auctionStatus = req.body.auctionStatus;
  const auctionDate = req.body.auctionDate;
  const auctionSession = req.body.auctionSession;
  console.log("updateAuction called", req.body)
  Auction.update(
    auctionId,
    auctionDate,
    auctionSession,
    auctionStatus,
    (err, data) => {
      if (err) {
        if (err.kind === "NOT_FOUND") {
          res.status(404).send({
            message: "Auction Not found ",
            auctionId: auctionId,
          });
        } else {
          res.status(500).send({
            message: "Could not update Auction",
            auctionId: auctionId,
          });
        }
      } else
        res.send({
          message: `Auction was updated successfully!`,
          auctionId: auctionId,
        });
    }
  );
};
