const express = require("express");
const auctionManagerController = require("../../controllers/auctionmanager/auctionManager.controller");

const router = express.Router();

router.post("/create", auctionManagerController.createAuction);
router.get("/auctions", auctionManagerController.findAll);

module.exports = router;
