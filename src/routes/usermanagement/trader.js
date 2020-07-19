const express = require('express');
const traderController = require("../../controllers/usermanagement/trader");

const router = express.Router();

router.post("/create", traderController.createTrader);
// router.get("/all", planterController.findAll);

module.exports = router;