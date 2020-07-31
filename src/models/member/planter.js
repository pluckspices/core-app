const sql = require("../../middleware/db.js");

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
      result(null, { planterURN });
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
  sql.end();
};

Planter.delete = (planterURN, result) => {
  sql.query(
    `DELETE FROM users_planter WHERE planter_urn = '${planterURN}'`,
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

Planter.update = (
  planterURN,
  firstName,
  lastName,
  crNumber,
  phoneNumber,
  address,
  result
) => {
  sql.query(
    `UPDATE users_planter SET
    first_name = '${firstName}',
    last_name = '${lastName}',
    cr_no = '${crNumber}',
    phone_number = '${phoneNumber}',
    address = '${address}'
    WHERE planter_urn = '${planterURN}';`,
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
      console.log("updated auction with id: ", planterURN);
      result(null, res);
    }
  );
};

module.exports = Planter;
