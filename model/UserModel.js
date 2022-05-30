const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  mid_name: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  mobile: {
    type: Number,
    unique: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    enum: ["Admin", "Clinic", "Staff", "Patient"],
    default: "Patient",
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

module.exports = User = mongoose.model("User", UserSchema);
