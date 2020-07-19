const express = require('express');
const PlanterController = require("../../controllers/usermanagement/planter");

const router = express.Router();

router.post("/create", PlanterController.createPlanter);
// router.get("/all", planterController.findAll);

module.exports = router;