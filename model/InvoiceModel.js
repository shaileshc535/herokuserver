const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  plan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
  },
  clinic_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinic",
  },
  subscription_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription",
  },
  amount: {
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

module.exports = Invoice = mongoose.model("Invoice", InvoiceSchema);
