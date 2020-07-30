const express = require("express");
const bodyParser = require("body-parser");

const AuthRoutes = require("./src/routes/auth");
const auctionManagerRoutes = require("./src/routes/auctionmanager/auctionManager");
const PlanterRoutes = require("./src/routes/usermanagement/planter");
const TraderRoutes = require("./src/routes/usermanagement/trader");
const DealerRoutes = require("./src/routes/usermanagement/dealer");
const BidderRoutes = require("./src/routes/usermanagement/bidder");
const app = express();

// application/json
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", AuthRoutes);
app.use("/auctionmanager", auctionManagerRoutes);
app.use("/planter", PlanterRoutes);
app.use("/trader", TraderRoutes);
app.use("/dealer", DealerRoutes);
app.use("/bidder", BidderRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
