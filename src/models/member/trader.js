const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TraderSchema = new Schema({
  traderURN: {
    type: String,
    required: true,
  },
  traderName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  tinNo: {
    type: String,
    default: 11,
  },
  cstNo: {
    type: String,
    required: true,
  },
  spicesBoardLicence: {
    type: String,
    default: 11,
  },
  shortName: {
    type: String,
    default: 11,
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

module.exports = mongoose.model("TraderSchema", TraderSchema, "member_dealer");
