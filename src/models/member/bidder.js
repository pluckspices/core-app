const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BidderSchema = new Schema({
  bidderName: {
    type: String,
    required: true,
  },
  bidderCode: {
    type: String,
    required: true,
  },
  membertypeId: {
    type: Number,
    default: 23,
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

module.exports = mongoose.model("BidderSchema", BidderSchema, "member_bidder");
