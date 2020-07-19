const express = require("express");
const BidderController = require("../../controllers/usermanagement/bidder");

const router = express.Router();

router.post("/create", BidderController.createBidder);

module.exports = router;
