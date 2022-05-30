const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  clinic_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinic",
    required: true,
  },
  paln_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
    required: true,
  },
  plan_amount: {
    type: Number,
  },
  paid_amount: {
    type: Number,
  },
  pending_amount: {
    type: Number,
  },
  discount: {
    type: Number,
    required: true,
  },
  payment_method: {
    type: String,
    required: true,
  },
  payment_status: {
    type: String,
    required: true,
  },
  transaction_id: {
    type: String,
    required: true,
  },
  plan_start: {
    type: String,
  },
  plan_end: {
    type: String,
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

module.exports = Subscription = mongoose.model(
  "Subscription",
  SubscriptionSchema
);
