const express = require("express");
const Router = express.Router();
const {
  CreateClinic,
  DeleteClinic,
  GetClinic,
  UpdateClinic,
  UpdateClinicStatus,
  GetClinicOwner,
} = require("../../controller/Admin/ClinicController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});

var upload = multer({ storage: storage });

var clinicImageUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "owner_image", maxCount: 1 },
]);

Router.get("/clinic", GetClinic);
Router.get("/clinic/:id", GetClinic);
Router.get("/clinic-owner/:id", GetClinicOwner);
Router.post("/clinic", clinicImageUpload, CreateClinic);
Router.post("/clinic-update", clinicImageUpload, UpdateClinic);
Router.post("/clinic-delete", DeleteClinic);
Router.post("/clinic-status", UpdateClinicStatus);

module.exports = Router;
