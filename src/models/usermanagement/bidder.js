const sql = require("../db.js");

const Bidder = (bidder) => {
  this.bidderName = bidder.bidderName;
  this.bidderCode = bidder.bidderCode;
};

Bidder.create = (bidderName, bidderCode, result) => {
  sql.query(
    `INSERT INTO users_bidder (bidder_name, bidder_code) VALUES ( '${bidderName}','${bidderCode}');`,
    (err, res) => { 
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { bidderCode });
    }
  );
};

module.exports = Bidder;
