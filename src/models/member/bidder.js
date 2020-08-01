const sql = require("../../middleware/db.js");

const Bidder = (bidder) => {
  this.bidderName = bidder.bidderName;
  this.bidderCode = bidder.bidderCode;
};

Bidder.create = (bidderName, bidderCode, result) => {
  sql.query(
    `INSERT INTO users_bidder (bidder_name, bidder_code) VALUES ( '${bidderName}','${bidderCode}');`,
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
        result(null, { bidderCode });
        return;
      }
      result(null, { bidderCode });
    }
  );
};

Bidder.getAll = (result) => {
  sql.query(
    `SELECT bidder_name AS bidderName,
     bidder_code AS bidderCode,
     created_on AS createdOn
    FROM users_bidder`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

Bidder.delete = (bidderCode, result) => {
  sql.query(
    `DELETE FROM users_bidder WHERE bidder_code = '${bidderCode}'`,
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
      result(null, res);
    }
  );
};

module.exports = Bidder;
