const sql = require("../../middleware/db.js");

const OwnedUser = (user) => {
  this.userEmail = user.userEmail;
  this.userPassword = user.userPassword;
};

OwnedUser.create = (userEmail, userPassword, result) => {
  sql.query(
    `INSERT INTO application_users (user_email, user_password) VALUES ( '${userEmail}', '${userPassword}');`,
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
        result(null, { userEmail });
      }
    }
  );
};

OwnedUser.findByEmail = (userEmail, result) => {
  sql.query(
    `SELECT user_email as userEmail,
      user_password as userPassword
      FROM application_users WHERE
      user_email= '${userEmail}';`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, res);
        return;
      } else {
        result({ kind: "NO_USER" }, null);
        return;
      }
    }
  );
};

module.exports = OwnedUser;
