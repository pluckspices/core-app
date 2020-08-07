const Trader = require("../../models/member/trader");
const CodeGenerator = require("../../middleware/unique-code");

exports.createTrader = (req, res, next) => {
  let traderName = req.body.traderName;
  let address = req.body.address;
  let tinNo = req.body.tinNo;
  let cstNo = req.body.cstNo;
  let spicesBoardLicence = req.body.spicesBoardLicence;
  let shortName = req.body.shortName;
  const agencyCode = "ABC";
  const memberType = "TR";
  const traderURN = agencyCode + memberType + CodeGenerator.uniqueCode();

  Trader.create(
    traderURN,
    traderName,
    address,
    tinNo,
    cstNo,
    spicesBoardLicence,
    shortName,
    (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Trader.",
        });
      } else res.send(data);
    }
  );
};

exports.tradersDetails = (req, res, next) => {
  Trader.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: "Some error occurred while retrieving Trader details.",
      });
    else res.send(data);
  });
};

exports.updateTrader = (req, res) => {
  const traderURN = req.params.traderURN;
  const traderName = req.body.traderName;
  const address = req.body.address;
  const tinNo = req.body.tinNo;
  const cstNo = req.body.cstNo;
  const spicesBoardLicence = req.body.spicesBoardLicence;
  const shortName = req.body.shortName;
  Trader.update(
    traderURN,
    traderName,
    address,
    tinNo,
    cstNo,
    spicesBoardLicence,
    shortName,
    (err, data) => {
      if (err) {
        if (err.kind === "NOT_FOUND") {
          res.status(404).send({
            message: "Trader Not found ",
            traderURN: traderURN,
          });
        } else {
          res.status(500).send({
            message: "Could not update Trader",
            traderURN: traderURN,
          });
        }
      } else
        res.send({
          message: `Trader was updated successfully!`,
          traderURN: traderURN,
        });
    }
  );
};

exports.deleteTrader = (req, res) => {
  const traderURN = req.params.traderURN;
  Trader.delete(traderURN, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Trader Not found",
          traderURN: traderURN,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Trader",
          traderURN: traderURN,
        });
      }
    } else
      res.send({
        message: `Trader was deleted successfully!`,
        traderURN: traderURN,
      });
  });
};
