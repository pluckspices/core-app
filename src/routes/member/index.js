const express = require("express");
const PlanterController = require("../../controllers/member/planter");
const BidderController = require("../../controllers/member/bidder");
const TraderController = require("../../controllers/member/trader");
const DealerController = require("../../controllers/member/dealer");

const router = express.Router();

//Planter
router.post("/planter", PlanterController.createPlanter);
router.get("/planters", PlanterController.plantersDetails);
router.put("/planter/:planterURN", PlanterController.updatePlanter);
router.delete("/planter/:planterURN", PlanterController.deletePlanter);

// Bidder
router.post("/bidder", BidderController.createBidder);

//Trader
router.post("/create", TraderController.createTrader);
// router.get("/all", planterController.findAll);

// Dealer
router.post("/create", DealerController.createDealer);

module.exports = router;
