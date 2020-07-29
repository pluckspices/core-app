const Planter = require("../../models/usermanagement/planter");
const Code = require("../../moddleware/uniqueCode");

exports.createPlanter = (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const crNumber = req.body.crNumber;
  const phoneNumber = req.body.phoneNumber;
  const address = req.body.address;
  const agencyCode = "ABC";
  const userType = "PL";
  const planterURN = agencyCode + userType + Code.uniqueCode();
  console.log("planterURN", planterURN);

  Planter.create(
    planterURN,
    firstName,
    lastName,
    crNumber,
    phoneNumber,
    address,
    (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.send({
          message:
            err.message || "Some error occurred while creating the Planter.",
        });
      }
      res.send(data);
    }
  );
};

exports.planterDetails = (req, res, next) => {
  Planter.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: "Some error occurred while retrieving Planter details.",
      });
    else res.send(data);
  });
};
