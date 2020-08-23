const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuctionSchema = new Schema({
  auctionId: {
    type: String,
    required: true,
  },
  auctionDate: {
    type: Date,
    required: true,
  },
  sessionId: {
    type: Number,
    required: true,
  },
  statusId: {
    type: Number,
    default: 11,
  },
  unoccupiedLots: {
    type: Array,
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
  "Auction",
  AuctionSchema,
  "auction_holding"
);
