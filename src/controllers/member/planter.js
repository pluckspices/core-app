const Planter = require("../../models/member/planter");
const CodeGenerator = require("../../middleware/unique-code");

exports.createPlanter = (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const crNumber = req.body.crNumber;
  const phoneNumber = req.body.phoneNumber;
  const address = req.body.address;
  const agencyCode = "ABC";
  const userType = "PL";
  const planterURN = agencyCode + userType + CodeGenerator.uniqueCode();
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
          message: "Some error occurred while creating the Planter.",
        });
      }
      res.send(data);
    }
  );
};

exports.plantersDetails = (req, res, next) => {
  Planter.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: "Some error occurred while retrieving Planter details.",
      });
    else res.send(data);
  });
};

exports.deletePlanter = (req, res) => {
  const planterURN = req.params.planterURN;
  Planter.delete(planterURN, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Planter Not found",
          planterURN: planterURN,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Planter",
          planterURN: planterURN,
        });
      }
    } else
      res.send({
        message: `Planter was deleted successfully!`,
        planterURN: planterURN,
      });
  });
};

exports.updatePlanter = (req, res) => {
  const planterURN = req.params.planterURN;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const crNumber = req.body.crNumber;
  const phoneNumber = req.body.phoneNumber;
  const address = req.body.address;
  Planter.update(
    planterURN,
    firstName,
    lastName,
    crNumber,
    phoneNumber,
    address,
    (err, data) => {
      if (err) {
        if (err.kind === "NOT_FOUND") {
          res.status(404).send({
            message: "Planter Not found ",
            planterURN: planterURN,
          });
        } else {
          res.status(500).send({
            message: "Could not update Planter",
            planterURN: planterURN,
          });
        }
      } else
        res.send({
          message: `Planter was updated successfully!`,
          planterURN: planterURN,
        });
    }
  );
};
