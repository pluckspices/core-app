const Dealer = require("../../models/usermanagement/dealer");

exports.createDealer = (req, res, next) => {
  let dealerName = req.body.dealerName;
  let address = req.body.address;
  let phoneNumber = req.body.phoneNumber;
  Dealer.create(dealerName, address, phoneNumber, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Dealer.",
      });
    } else res.send(data);
  });
};
