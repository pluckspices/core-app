const sql = require("../db.js");

const Planter = (planter) => {
  this.name = planter.name;
  this.phoneNumber = planter.phoneNumber;
  this.crNumber = this.crNumber;
  this.address = this.address;
};

Planter.create = (name, crNumber, phoneNumber, address, result) => {
  sql.query(
    `INSERT INTO users_planter (name, cr_no, phonenumber, address) VALUES ( '${name}', '${crNumber}', '${phoneNumber}', '${address}');`,
    (err) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { crNumber });
    }
  );
};

module.exports = Planter;
