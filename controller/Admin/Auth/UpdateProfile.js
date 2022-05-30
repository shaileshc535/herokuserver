const UserModel = require("../../../models/userModel");
const validattion = require("../../../validation/RegisterValidation");

module.exports.UserProfile = (req, res, next) => {
  if (req.params.id) {
    UserModel.find({ isdeleted: false, _id: req.params.id })
      .exec()
      .then((result) => {
        res.status(201).json({
          success: true,
          msg: "success",
          data: result,
        });
      })
      .catch((err) => {
        res.json({
          success: false,
          msg: "User Profile Fetch error...",
          error: err,
        });
      });
  } else {
    res.json({
      success: false,
      msg: "User Profile Fetch error...",
    });
  }
};

module.exports.getAllPatients = (req, res, next) => {
  UserModel.find({ isdeleted: false, role: "Patient" })
    .exec()
    .then((result) => {
      res.status(201).json({
        success: true,
        msg: "success",
        data: result,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        msg: "Patient List Fetch error...",
        error: err,
      });
    });
};

module.exports.getPatientDetails = (req, res, next) => {
  if (req.params.id) {
    UserModel.find({ isdeleted: false, role: "Patient", _id: req.params.id })
      .exec()
      .then((result) => {
        res.status(201).json({
          success: true,
          msg: "success",
          data: result,
        });
      })
      .catch((err) => {
        res.json({
          success: false,
          msg: "Patient Details Fetch error...",
          error: err,
        });
      });
  } else {
    res.json({
      success: false,
      msg: "Patient Details Fetch error...",
    });
  }
};

module.exports.getAllStaff = (req, res, next) => {
  UserModel.find({ isdeleted: false, role: "Staff" })
    .exec()
    .then((result) => {
      res.status(201).json({
        success: true,
        msg: "success",
        data: result,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        msg: "Patient List Fetch error...",
        error: err,
      });
    });
};

module.exports.getStaffDetails = (req, res, next) => {
  if (req.params.id) {
    UserModel.find({ isdeleted: false, role: "Staff", _id: req.params.id })
      .exec()
      .then((result) => {
        res.status(201).json({
          success: true,
          msg: "success",
          data: result,
        });
      })
      .catch((err) => {
        res.json({
          success: false,
          msg: "Patient Details Fetch error...",
          error: err,
        });
      });
  } else {
    res.json({
      success: false,
      msg: "Patient Details Fetch error...",
    });
  }
};

module.exports.getAllClinic = (req, res, next) => {
  UserModel.find({ isdeleted: false, role: "Clinic" })
    .exec()
    .then((result) => {
      res.status(201).json({
        success: true,
        msg: "success",
        data: result,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        msg: "Patient List Fetch error...",
        error: err,
      });
    });
};

module.exports.getClinicDetails = (req, res, next) => {
  if (req.params.id) {
    UserModel.find({ isdeleted: false, role: "Clinic", _id: req.params.id })
      .exec()
      .then((result) => {
        res.status(201).json({
          success: true,
          msg: "success",
          data: result,
        });
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          msg: "Patient Details Fetch error...",
          error: err,
        });
      });
  } else {
    res.json({
      success: false,
      msg: "Patient Details Fetch error...",
    });
  }
};

module.exports.UpdateProfile = (req, res, next) => {
  const updateProfileDetails = {
    first_name: req.body.first_name,
    mid_name: req.body.mid_name,
    last_name: req.body.last_name,
    email: req.body.email,
    mobile: req.body.mobile,
    updated_at: new Date(),
  };

  UserModel.findByIdAndUpdate({ _id: req.body.id }, updateProfileDetails, {
    upsert: true,
    new: true,
  })
    .then((result) => {
      res.status(201).json({
        success: true,
        msg: "success",
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        msg: "Something Went Wrong, Please try again later",
        error: err,
      });
    });
};

module.exports.UpdateStatus = (req, res, next) => {
  const updateStatus = {
    status: req.body.status,
  };

  UserModel.findByIdAndUpdate({ _id: req.body.id }, updateStatus, {
    upsert: true,
    new: true,
  })
    .then((result) => {
      res.status(201).json({
        success: true,
        msg: "success",
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        msg: "Something Went Wrong, Please try again later",
        error: err,
      });
    });
};

module.exports.DeleteUser = (req, res, next) => {
  const updateStatus = {
    isdeleted: true,
    deleted_at: new Date(),
  };

  UserModel.findByIdAndUpdate({ _id: req.body.id }, updateStatus, {
    upsert: true,
    new: true,
  })
    .then((result) => {
      res.status(201).json({
        success: true,
        msg: "success",
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        msg: "Something Went Wrong, Please try again later",
        error: err,
      });
    });
};
