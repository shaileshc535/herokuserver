const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  plan_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  max_user: {
    type: Number,
  },
  max_patient: {
    type: Number,
  },
  max_room: {
    type: Number,
  },
  max_storege: {
    type: String,
  },
  storege_unit: {
    type: String,
    enum: ["GB", "MB"],
    default: "GB",
  },
  price: {
    type: String,
    required: true,
  },
  price_intervel: {
    type: String,
    enum: ["Monthly", "Anual"],
    default: "Anual",
  },
  status: {
    type: Boolean,
    default: true,
  },
  isdeleted: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
  },
  deleted_at: {
    type: Date,
  },
});

module.exports = Plan = mongoose.model("Plan", PlanSchema);
