const express = require("express");
const AuctionController = require("../../controllers/auction");
const isAuth = require("../../middleware/is-auth");

const router = express.Router();

//auction-manager
router.post("/auction", AuctionController.createAuction);
// router.get("/auctions/holding", isAuth, AuctionController.auctionHolding);
router.get("/auctions/holding", AuctionController.auctionHolding);
router.get("/auctions/holding/:statusId", AuctionController.auctionHoldingByStatus);
router.get("/auctions/history", AuctionController.auctionHistory);
router.delete("/auction/:auctionId", AuctionController.deleteAuction);
router.put("/auction/:auctionId", AuctionController.updateAuction);

//pooling
// router.post("/commodity")

module.exports = router;
