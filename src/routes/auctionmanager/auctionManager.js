const express = require("express");
const auctionManagerController = require("../../controllers/auctionmanager/auctionManager");

const router = express.Router();

router.post("/create", auctionManagerController.createAuction);
router.get("/holdings", auctionManagerController.auctionHoldings);
router.get("/history", auctionManagerController.auctionHistory);
router.delete("/delete-auction", auctionManagerController.deleteAuction);
router.put("/update-auction", auctionManagerController.updateAuction);

module.exports = router;
