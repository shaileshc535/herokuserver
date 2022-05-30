const mongoose = require("mongoose");

const ClinicUsersSchema = new mongoose.Schema({
  clinic_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinic",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  date_of_birth: {
    type: String,
  },
  user_type: {
    type: String,
    enum: ["Clinic-User", "Super-Admin"],
    default: "Clinic-User",
  },
  role_in_clinic: {
    type: String,
    enum: ["Assistant", "Coordinator", "Dentist", "Owner"],
    default: "Dentist",
  },
  image: {
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

module.exports = ClinicUser = mongoose.model("ClinicUser", ClinicUsersSchema);
