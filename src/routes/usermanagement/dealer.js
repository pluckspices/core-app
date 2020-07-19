const express = require("express");
const DealerController = require("../../controllers/usermanagement/dealer");

const router = express.Router();

router.post("/create", DealerController.createDealer);

module.exports = router;
