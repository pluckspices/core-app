const express = require("express");
const bodyParser = require("body-parser");

const auctionManagerRoutes = require('./src/routes/auctionManager.route');
const app = express();

//x-www-form-urlencoded <form>
// app.use(bodyParser.urlencoded({ extended: false }));
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

app.use('/auctionmanager', auctionManagerRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});