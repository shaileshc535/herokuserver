const express = require("express");
const router = express.Router();
const {
  UserLogin,
  registerClinic,
  registerPatient,
  registerStaff,
  registerAdmin,
} = require("../../controller/Admin/Auth/Register");

router.post("/login", UserLogin);
router.post("/create-clinic", registerClinic);
router.post("/create-patient", registerPatient);
router.post("/create-staff", registerStaff);
router.post("/create-admin", registerAdmin);

module.exports = router;
