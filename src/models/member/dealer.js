const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DealerSchema = new Schema({
  dealerURN: {
    type: String,
    required: true,
  },
  dealerName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
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

module.exports = mongoose.model(
  "DealerSchema",
  DealerSchema,
  "member_dealer"
);
