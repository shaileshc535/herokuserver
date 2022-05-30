const mongoose = require("mongoose");

const countriesSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  sortname: {
    type: String,
  },
  name: {
    type: String,
  },
  phonecode: {
    type: String,
  },
  visible: {
    type: Number,
  },
});

module.exports = countries = mongoose.model("countries", countriesSchema);
