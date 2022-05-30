const ClinicUsersModel = require("../../model/ClinicUsers");
var mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

module.exports.CreateClinicUser = (req, res) => {
  let password = req.body.password;

  bcrypt.hash(password, 12, function (err, hash) {
    if (err) {
      return res.status(400).json({
        success: false,
        msg: "Something went wrong. Please try again",
        error: err,
      });
    } else {
      var User = new ClinicUsersModel({
        name: req.body.name,
        clinic_id: req.body.clinic_id,
        mobile: req.body.mobile,
        email: req.body.email,
        password: hash,
        date_of_birth: req.body.date_of_birth,
        user_type: req.body.user_type,
        role_in_clinic: req.body.role_in_clinic,
        image: req.file.filename,
      });

      User.save()
        .then((result) => {
          res.status(201).json({
            success: true,
            msg: "Clinic User Created Successfully",
            data: result,
          });
        })
        .catch((err) => {
          res.status(400).json({
            success: false,
            msg: "Something went wrong. Please try again",
            error: err,
          });
        });
    }
  });
};

module.exports.UpdateClinicUser = (req, res) => {
  console.log("req", req.body);
  var UpdateClinicDetails = {
    name: req.body.name,
    clinic_id: req.body.clinic_id,
    mobile: req.body.mobile,
    email: req.body.email,
    date_of_birth: req.body.date_of_birth,
    user_type: req.body.user_type,
    role_in_clinic: req.body.role_in_clinic,
    image: req.file.filename,
  };

  const _id = req.body.id;

  if (_id !== null && _id !== "" && _id !== undefined) {
    ClinicUsersModel.findByIdAndUpdate(
      { _id: req.body.id },
      UpdateClinicDetails,
      {
        upsert: true,
        new: true,
      }
    )
      .then((result) => {
        res.status(201).json({
          success: true,
          msg: "Clinic User Updated Successfully",
          data: result,
        });
      })
      .catch((err) => {
        console.log("error", err);
        res.status(400).json({
          success: false,
          msg: "Something Went Wrong, Please try again later",
          error: err,
        });
      });
  } else {
    res.status(400).json({
      success: false,
      msg: "Clinic Id Is Required",
      error: "",
    });
  }
};

module.exports.GetClinicUserList = (req, res) => {
  if (req.params.id) {
    ClinicUsersModel.find({ isdeleted: false, clinic_id: req.params.id })
      .populate("clinic_id")
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
          msg: "Clinic User Fetch error...",
          error: err,
        });
      });
  } else {
    res.status(400).json({
      success: false,
      msg: "Clinic Id Is Required",
      error: "",
    });
  }
};

module.exports.GetClinicUserDetails = (req, res) => {
  if (req.params.id) {
    ClinicUsersModel.find({ isdeleted: false, _id: req.params.id })
      .populate("clinic_id")
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
          msg: "Clinic User Fetch error...",
          error: err,
        });
      });
  } else {
    res.status(400).json({
      success: false,
      msg: "Clinic Id Is Required",
      error: "",
    });
  }
};

module.exports.UpdateClinicUserStatus = (req, res) => {
  ClinicUsersModel.find({ _id: req.body.id })
    .then((result1) => {
      let status = result1[0].status;

      if (status !== true) {
        value = true;
      } else {
        value = false;
      }

      const updateStatus = {
        status: value,
      };

      ClinicUsersModel.findByIdAndUpdate({ _id: req.body.id }, updateStatus, {
        upsert: true,
        new: true,
      }).then((result) => {
        res.status(201).json({
          success: true,
          msg: "success",
          data: result,
        });
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

module.exports.DeleteClinicUser = (req, res, next) => {
  const updateStatus = {
    isdeleted: true,
    deleted_at: new Date(),
  };

  ClinicUsersModel.findByIdAndUpdate({ _id: req.body.id }, updateStatus, {
    upsert: true,
    new: true,
  })
    .then((result) => {
      res.status(201).json({
        success: true,
        msg: "success",
        data: result.deleted_at,
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
