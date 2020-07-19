const Trader = require("../../models/usermanagement/trader");

exports.createTrader = (req, res, next) => {
  let traderName = req.body.traderName;
  let address = req.body.address;
  let tinNo = req.body.tinNo;
  let cstNo = req.body.cstNo;
  let spicesBoardLicence = req.body.spicesBoardLicence;
  let shortName = req.body.shortName;

  Trader.create(
    traderName,
    address,
    tinNo,
    cstNo,
    spicesBoardLicence,
    shortName,
    (err, data) => {
      if (err) {
        console.log("got error in controller");
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Trader.",
        });
      } else res.send(data);
    }
  );
};
