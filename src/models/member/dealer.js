const sql = require("../../middleware/db.js");

const Dealer = (trader) => {
  this.dealerName = trader.name;
  this.phoneNumber = trader.phoneNumber;
  this.address = trader.address;
};

Dealer.create = (dealerName, address, phoneNumber, result) => {
  sql.query(
    `INSERT INTO users_dealer (dealer_name, phonenumber, address) VALUES ( '${dealerName}','${phoneNumber}','${address}');`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { dealerName });
    }
  );
};

module.exports = Dealer;
