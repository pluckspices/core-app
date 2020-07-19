const sql = require("../db.js");

// constructor
const Auction = (auction) => {
  this.auctionNumber = auction.auctionNumber;
  this.auctionDate = auction.auctionDate;
};

Auction.create = (auctionId, auctionDate, session, status, result) => {
  sql.query(
    `INSERT INTO auction (auctionid, acutiondate, session, status) VALUES ( '${auctionId}', '${auctionDate}', '${session}', '${status}');`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { auctionId });
    }
  );
};

Auction.getAll = result => {
    sql.query("SELECT * FROM auction", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      
      console.log("auctions: ", res);
      result(null, res);
    });
  };
module.exports = Auction;
