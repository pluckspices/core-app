const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlanterSchema = new Schema({
  planterURN: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  crNumber: {
    type: String,
    default: 11,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  address: {
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

module.exports = mongoose.model(
  "PlanterSchema",
  PlanterSchema,
  "member_planter"
);
