const moment = require("moment");
const Auction = require("../../models/auctionmanager/auction.model");

exports.createAuction = (req, res, next) => {
  console.log("create auction called");
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
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer.",
        });
      else res.send(data);
    }
  );
};

exports.findAll = (req, res) => {
    Auction.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      else res.send(data);
    });
  };
