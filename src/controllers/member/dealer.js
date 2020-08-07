const Dealer = require("../../models/member/dealer");
const CodeGenerator = require("../../middleware/unique-code");

exports.createDealer = (req, res, next) => {
  let dealerName = req.body.dealerName;
  let address = req.body.address;
  let phoneNumber = req.body.phoneNumber;
  const agencyCode = "ABC";
  const memberType = "DL";
  const dealerURN = agencyCode + memberType + CodeGenerator.uniqueCode();

  Dealer.create(dealerURN, dealerName, address, phoneNumber, (err, data) => {
    if (err) {
      if (err.kind === "DUP_ENTRY") {
        res.status(409).send({
          message: "Dealer already exists",
          dealerURN: dealerURN,
        });
      } else if (!err.kind) {
        res.status(500).send({
          message: "Some error occurred while creating the Dealer",
        });
      }
    } else res.send(data);
  });
};

exports.dealerDetails = (req, res, next) => {
  Dealer.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: "Some error occurred while retrieving Dealer details.",
      });
    else res.send(data);
  });
};

exports.updateDealer = (req, res) => {
  const dealerURN = req.params.dealerURN;
  const ddealerName = req.body.dealerName;
  const phoneNumber = req.body.phoneNumber;
  const address = req.body.address;
  Dealer.update(
    dealerURN,
    ddealerName,
    phoneNumber,
    address,
    (err, data) => {
      if (err) {
        if (err.kind === "NOT_FOUND") {
          res.status(404).send({
            message: "Planter Not found ",
            dealerURN: dealerURN,
          });
        } else {
          res.status(500).send({
            message: "Could not update Planter",
            dealerURN: dealerURN,
          });
        }
      } else
        res.send({
          message: `Planter was updated successfully!`,
          dealerURN: dealerURN,
        });
    }
  );
};

exports.deleteDealer = (req, res) => {
  const dealerURN = req.params.dealerURN;
  Dealer.delete(dealerURN, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Dealer Not found",
          dealerURN: dealerURN,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Dealer",
          dealerURN: dealerURN,
        });
      }
    } else
      res.send({
        message: `Dealer was deleted successfully!`,
        dealerURN: dealerURN,
      });
  });
};
