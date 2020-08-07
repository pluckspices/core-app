const sql = require("../../middleware/db.js");

const Dealer = (dealer) => {
  this.dealerName = dealer.name;
  this.phoneNumber = dealer.phoneNumber;
  this.address = dealer.address;
};

Dealer.create = (dealerURN, dealerName, address, phoneNumber, result) => {
  sql.query(
    `INSERT INTO member_dealer (dealer_urn, dealer_name, phone_number, address) VALUES ( '${dealerURN}','${dealerName}','${phoneNumber}','${address}');`,
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
        result(null, { dealerURN });
        return;
      } else {
        console.log("error: ", err);
        result(err, null);
        return;
      }
    }
  );
};

Dealer.getAll = (result) => {
  sql.query(
    `SELECT dealer_urn AS dealerURN,
    dealer_name AS dealerName,
    phone_number AS phoneNumber,
    address,
    created_on AS createdOn
    FROM member_dealer`,
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

Dealer.update = (
  dealerURN,
  dealerName,
  phoneNumber,
  address,
  result
) => {
  sql.query(
    `UPDATE member_dealer SET
    dealer_name = '${dealerName}',
    phone_number = '${phoneNumber}',
    address = '${address}'
    WHERE dealer_urn = '${dealerURN}';`,
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
      result(null, res);
    }
  );
};


Dealer.delete = (dealerURN, result) => {
  sql.query(
    `DELETE FROM member_dealer WHERE dealer_urn = '${dealerURN}'`,
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

module.exports = Dealer;
