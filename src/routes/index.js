const express = require("express");
const UserRoutes = require("./user");
const AuctionRoutes = require("./auction");
const MemberRoutes = require("./member");
const CommodityRoutes = require("./commodity");

const app = express();

app.use("/user-management", UserRoutes);
app.use("/auction-management", AuctionRoutes);
app.use("/member-management", MemberRoutes);
app.use("/commodity-management", CommodityRoutes);

module.exports = app;
