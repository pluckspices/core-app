const Planter = require("../../models/usermanagement/planter");

exports.createPlanter = (req, res, next) => {
  let name = req.body.name;
  let crNumber = req.body.crNumber;
  let phoneNumber = req.body.phoneNumber;
  let address = req.body.address;

  Planter.create(name, crNumber, phoneNumber, address, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.send({
        message:
          err.message || "Some error occurred while creating the Planter.",
      });
    }
    res.send(data);
  });
};
