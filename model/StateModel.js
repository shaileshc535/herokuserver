const mongoose = require("mongoose");

const statesSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  country_id: {
    type: Number,
  },
  visible: {
    type: Number,
  },
  isdeleted: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
  },
});

module.exports = states = mongoose.model("states", statesSchema);
