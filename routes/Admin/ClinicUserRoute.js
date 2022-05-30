const express = require("express");
const Router = express.Router();
const {
  CreateClinicUser,
  DeleteClinicUser,
  UpdateClinicUser,
  GetClinicUserDetails,
  GetClinicUserList,
  UpdateClinicUserStatus,
} = require("../../controller/Admin/ClinicUserController");
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

var upload = multer({ storage: storage }).single("image");

Router.get("/clinic-user-details/:id", GetClinicUserDetails);
Router.get("/clinic-user-list/:id", GetClinicUserList);
Router.post("/clinic-user", upload, CreateClinicUser);
Router.post("/clinic-user-update", upload, UpdateClinicUser);
Router.post("/clinic-user-delete", DeleteClinicUser);
Router.post("/clinic-user-status", UpdateClinicUserStatus);

module.exports = Router;
