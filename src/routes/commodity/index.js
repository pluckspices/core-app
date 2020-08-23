const express = require("express");
const CommodityController = require("../../controllers/commodity");

const router = express.Router();

//Commodities
router.post("/commodity", CommodityController.createItem);
router.get("/commodity/search/:auctionId", CommodityController.searchPoolByAuction);
router.get("/commodity/stock", CommodityController.stockList);

module.exports = router;
