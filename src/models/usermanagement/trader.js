const sql = require("../db.js");

const Trader = (trader) => {
  this.name = trader.name;
  this.address = trader.address;
  this.tinNo = trader.tinNo;
  this.cstNo = trader.cstNo;
  this.spicesBoardLicence = trader.spicesBoardLicence;
  this.shortName = trader.shortName;
};

Trader.create = (
  traderName,
  address,
  tinNo,
  cstNo,
  spicesBoardLicence,
  shortName,
  result
) => {
  sql.query(
    `INSERT INTO users_trader (trader_name, address, tin_no, cst_no, spices_board_licence, short_name) VALUES ( '${traderName}', '${address}', '${tinNo}', '${cstNo}', '${spicesBoardLicence}', '${shortName}');`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { traderName });
    }
  );
};

module.exports = Trader;
