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
router.get("/bidders", BidderController.bidderDetails);
router.delete("/bidder/:bidderCode", BidderController.deleteBidder);

//Trader
router.post("/trader", TraderController.createTrader);
router.get("/traders", TraderController.tradersDetails);
router.put("/trader/:traderURN", TraderController.updateTrader);
router.delete("/trader/:traderURN", TraderController.deleteTrader);

// Dealer
router.post("/dealer", DealerController.createDealer);
router.get("/dealers", DealerController.dealerDetails);
router.put("/dealer/:dealerURN", DealerController.updateDealer);
router.delete("/dealer/:dealerURN", DealerController.deleteDealer);

module.exports = router;
