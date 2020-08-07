const sqlPool = require("../../middleware/db.js");

const Trader = (trader) => {
  this.name = trader.name;
  this.address = trader.address;
  this.tinNo = trader.tinNo;
  this.cstNo = trader.cstNo;
  this.spicesBoardLicence = trader.spicesBoardLicence;
  this.shortName = trader.shortName;
};

Trader.create = (
  traderURN,
  traderName,
  address,
  tinNo,
  cstNo,
  spicesBoardLicence,
  shortName,
  result
) => {
  sqlPool.getConnection((err, connection) => {
    if (err) {
      console.log("db error");
      result(err, null);
      return;
    }
    connection.query(
      `INSERT INTO member_trader 
      (trader_urn, trader_name, address, tin_no,
      cst_no, spices_board_licence, short_name) VALUES
      ('${traderURN}','${traderName}', '${address}',
      '${tinNo}', '${cstNo}', '${spicesBoardLicence}', '${shortName}');`,
      (err, res) => {
        connection.release();
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        result(null, { traderURN });
      }
    );
  });
};

Trader.getAll = (result) => {
  sqlPool.getConnection((err, connection) => {
    if (err) {
      console.log("db error");
      result(err, null);
      return;
    }
    connection.query(
      `SELECT trader_urn as traderURN,
      trader_name as traderName,
      address,
      tin_no as tinNo,
      cst_no as cstNo,
      spices_board_licence as spicesBoardLicence,
      short_name as shortName,
      created_on as createdOn
      from member_trader`,
      (err, res) => {
        connection.release();
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        result(null, res);
      }
    );
  });
};

Trader.update = (
  traderURN,
  traderName,
  address,
  tinNo,
  cstNo,
  spicesBoardLicence,
  shortName,
  result
) => {
  sqlPool.getConnection((err, connection) => {
    if (err) {
      console.log("db error");
      result(err, null);
      return;
    }
    connection.query(
      `UPDATE member_trader SET
    trader_name = '${traderName}',
    address = '${address}',
    tin_no = '${tinNo}',
    cst_no = '${cstNo}',
    spices_board_licence = '${spicesBoardLicence}',
    short_name = '${shortName}'
    WHERE trader_urn = '${traderURN}';`,
      (err, res) => {
        connection.release();
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
  });
};

Trader.delete = (traderURN, result) => {
  sqlPool.getConnection((err, connection) => {
    if (err) {
      console.log("db error");
      result(err, null);
      return;
    }
    connection.query(
      `DELETE FROM member_trader WHERE trader_urn = '${traderURN}'`,
      (err, res) => {
        connection.release();
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
  });
};

module.exports = Trader;
