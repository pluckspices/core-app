const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OwnedUserSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  auctioneerUID: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("OwnedUser", OwnedUserSchema, "owned_users");
