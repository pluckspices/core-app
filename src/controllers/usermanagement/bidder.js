const Bidder = require("../../models/usermanagement/bidder");

exports.createBidder = (req, res, next) => {
  let bidderName = req.body.bidderName;
  let bidderCode = req.body.bidderCode;
  bidderCode = "BID"+bidderCode;
  Bidder.create(bidderName, bidderCode, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Bidder.",
      });
    } else res.send(data);
  });
};
