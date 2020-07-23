const sql = require("../db.js");

// constructor
const Auction = (auction) => {
  this.auctionNumber = auction.auctionNumber;
  this.auctionDate = auction.auctionDate;
};

Auction.create = (auctionId, auctionDate, session, status, result) => {
  sql.query(
    `INSERT INTO auction_holding (auction_id, auction_date, session_id, status_id) VALUES ( '${auctionId}', '${auctionDate}', '${session}', '${status}');`,
    (err, res) => {
      if (err) {
        if (err.code == "ER_DUP_ENTRY" || err.errno == 1062) {
          result({ kind: "DUP_ENTRY" }, null);
          return;
        }
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 1) {
        result(null, { auctionId });
      }
    }
  );
};

Auction.getHoldings = (result) => {
  sql.query(
    `SELECT auction_id as auctionId,
     auction_date as auctionDate,
     session_id as sessionId,
     status_id as statusId
     from auction_holding where status_id not in (15)`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("auctions: ", res);
      result(null, res);
    }
  );
};

Auction.getHistory = (result) => {
  sql.query(
    `SELECT auction_id as auctionId,
     auction_date as auctionDate,
     session_id as sessionId,
     status_id as statusId
     from auction_holding where status_id = 15`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("auctions: ", res);
      result(null, res);
    }
  );
};

Auction.delete = (auctionId, result) => {
  sql.query(
    `DELETE FROM auction_holding WHERE auction_id = '${auctionId}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found with id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted auction with id: ", auctionId);
      result(null, res);
    }
  );
};

Auction.update = (
  auctionId,
  auctionDate,
  auctionSession,
  auctionStatus,
  result
) => {
  sql.query(
    `UPDATE auction_holding SET
    auction_date = '${auctionDate}',
    session_id = '${auctionSession}',
    status_id = '${auctionStatus}'
    WHERE auction_id = '${auctionId}';`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "NOT_FOUND" }, null);
        return;
      }
      console.log("updated auction with id: ", auctionId);
      result(null, res);
    }
  );
};
module.exports = Auction;
