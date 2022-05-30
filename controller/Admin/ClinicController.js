const ClinicModel = require("../../model/ClinicModel");
const ClinicUsersModel = require("../../model/ClinicUsers");
const StateModel = require("../../model/StateModel");
const CountryModel = require("../../model/CountryModel");
const bcrypt = require("bcryptjs");

var mongoose = require("mongoose");

module.exports.CreateClinic = (req, res) => {
  const ClinicDetails = {
    clinic_name: req.body.clinic_name,
    mobile: req.body.mobile,
    email: req.body.email,
    website: req.body.website,
    country: req.body.country,
    state: req.body.state,
    city: req.body.city,
    address: req.body.address,
    pincode: req.body.pincode,
    time_zone: req.body.time_zone,
    province: req.body.province,
    image: req.files.image[0].filename,
  };

  let newClinic = ClinicModel(ClinicDetails);

  newClinic
    .save()
    .then((data) => {
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
            name: req.body.owner_name,
            clinic_id: data._id,
            mobile: req.body.owner_mobile,
            email: req.body.owner_email,
            password: hash,
            date_of_birth: req.body.date_of_birth,
            user_type: req.body.user_type,
            role_in_clinic: req.body.role_in_clinic,
            image: req.files.owner_image[0].filename,
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
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        msg: err.message || "Something went wrong. Please try again",
        error: err,
      });
    });
};

module.exports.UpdateClinic = (req, res) => {
  const UpdateClinicDetails = {
    clinic_name: req.body.clinic_name,
    mobile: req.body.mobile,
    email: req.body.email,
    website: req.body.website,
    country: req.body.country,
    state: req.body.state,
    city: req.body.city,
    address: req.body.address,
    pincode: req.body.pincode,
    time_zone: req.body.time_zone,
    province: req.body.province,
    image: req.files.image[0].filename,
    updated_at: new Date(),
  };

  const _id = req.body.id;

  if (_id !== null && _id !== "" && _id !== undefined) {
    ClinicModel.findByIdAndUpdate({ _id: req.body.id }, UpdateClinicDetails, {
      upsert: true,
      new: true,
    })
      .then((result) => {
        res.status(201).json({
          success: true,
          msg: "Clinic Updated Successfully",
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
  } else {
    res.status(400).json({
      success: false,
      msg: "Clinic Id Is Required",
      error: "",
    });
  }
};

module.exports.GetClinic = (req, res) => {
  if (req.params.id) {
    ClinicModel.find({ isdeleted: false, _id: req.params.id })
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
          msg: "Clinic Fetch error...",
          error: err,
        });
      });
  } else {
    ClinicModel.find({ isdeleted: false })
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
          msg: "Clinic Fetch error...",
          error: err,
        });
      });
  }
};

module.exports.GetClinicOwner = (req, res) => {
  if (req.params.id) {
    ClinicUsersModel.find({
      isdeleted: false,
      clinic_id: req.params.id,
      role_in_clinic: "Owner",
    })
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
          msg: "Clinic Fetch error...",
          error: err,
        });
      });
  } else {
    res.json({
      success: false,
      msg: "Clinic Owner Fetch error...",
      error: err,
    });
  }
};

module.exports.UpdateClinicStatus = (req, res) => {
  ClinicModel.find({ _id: req.body.id })
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

      ClinicModel.findByIdAndUpdate({ _id: req.body.id }, updateStatus, {
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

module.exports.DeleteClinic = (req, res, next) => {
  const updateStatus = {
    isdeleted: true,
    deleted_at: new Date(),
  };

  ClinicModel.findByIdAndUpdate({ _id: req.body.id }, updateStatus, {
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
