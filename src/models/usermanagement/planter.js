const sql = require("../db.js");

const Planter = (planter) => {
  this.name = planter.name;
  this.phoneNumber = planter.phoneNumber;
  this.crNumber = this.crNumber;
  this.address = this.address;
};

Planter.create = (
  planterURN,
  firstName,
  lastName,
  crNumber,
  phoneNumber,
  address,
  result
) => {
  sql.query(
    `INSERT INTO users_planter (planter_urn, first_name, last_name, cr_no, phone_number, address) VALUES ( '${planterURN}', '${firstName}', '${lastName}', '${crNumber}', '${phoneNumber}', '${address}');`,
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

Planter.getAll = (result) => {
  sql.query(
    `SELECT planter_urn as planterURN,
    first_name as firstName,
    last_name as lastName,
    cr_no as crNumber
    from users_planter`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("planters: ", res);
      result(null, res);
    }
  );
};

module.exports = Planter;
