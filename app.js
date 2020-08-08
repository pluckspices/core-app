const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const V1Routes = require("./src/routes");
require("dotenv").config();
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

app.use("/v1.0", V1Routes);

app.use((error, req, res, next) => {
  console.log(["uncaught exception"], error);
  const status = error.statusCode || 500;
  const message = error.message;
  const details = error.details;
  res.status(status).send({ message, details });
});

const PORT = process.env.PORT || 8080;
const DB_PROVIDER = process.env.COREAPP_DB_PROVIDER;
const DB_HOST = process.env.COREAPP_DB_HOST;
const DB_USER = process.env.COREAPP_DB_USER;
const DB_PASSWORD = process.env.COREAPP_DB_PASSWORD;
const DB_DATABASE = process.env.COREAPP_DB_DATABASE;

mongoose
  .connect(
    `${DB_PROVIDER}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}?retryWrites=true`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => {
    app.listen(PORT);
  })
  .catch((err) => console.log(err));
