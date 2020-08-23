const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommoditySchema = new Schema({
  transactionNo: {
    type: Number,
    required: true,
  },
  member: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  poolCategory: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  collectionCentre: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  litreWeight: {
    type: Number,
    required: true,
  },
  auction: {
    type: Schema.Types.ObjectId,
    ref: "Auction",
  },
  lotNo: {
    type: Number,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "Commodity",
  CommoditySchema,
  "commodity_transactions"
);
