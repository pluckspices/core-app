const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UniqueIdSchema = new Schema({
  collectionName: {
    type: String,
  },
  seqName: {
    type: String,
  },
  seqValue: {
    type: Number,
  },
});

module.exports = mongoose.model("UniqueId", UniqueIdSchema, "unique_ids");
