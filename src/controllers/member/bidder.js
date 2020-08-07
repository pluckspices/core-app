const Bidder = require("../../models/member/bidder");

exports.createBidder = (req, res, next) => {
  let bidderName = req.body.bidderName;
  let bidderCode = req.body.bidderCode;
  bidderCode = "BID" + bidderCode;
  Bidder.create(bidderName, bidderCode, (err, data) => {
    if (err) {
      if (err.kind === "DUP_ENTRY") {
        res.status(409).send({
          message: "Bidder already exists",
          bidderCode: bidderCode,
        });
      } else if (!err.kind) {
        res.status(500).send({
          message: "Some error occurred while creating the Bidder",
        });
      }
    } else res.send(data);
  });
};

exports.bidderDetails = (req, res, next) => {
  Bidder.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: "Some error occurred while retrieving Bidder details.",
      });
    else res.send(data);
  });
};

exports.deleteBidder = (req, res) => {
  const bidderCode = req.params.bidderCode;
  Bidder.delete(bidderCode, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Bidder Not found",
          bidderCode: bidderCode,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Bidder",
          bidderCode: bidderCode,
        });
      }
    } else
      res.send({
        message: `Bidder was deleted successfully!`,
        bidderCode: bidderCode,
      });
  });
};
