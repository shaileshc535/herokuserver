const PlanModel = require("../../model/PlanModel");
const PlanValidation = require("../../validation/PlanValidation");
var mongoose = require("mongoose");

module.exports.CreatePlan = (req, res) => {
  const { errors, isValid } = PlanValidation(req.body);

  if (!isValid) {
    return res.status(400).json({
      success: false,
      msg: errors,
    });
  }

  let newPlan = PlanModel(req.body);
  newPlan
    .save()
    .then((data) => {
      res.status(200).json({
        success: true,
        msg: "Plan Created Successfully",
        data: data,
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

module.exports.UpdatePlan = (req, res) => {
  const UpdatePlanDetails = {
    plan_name: req.body.plan_name,
    description: req.body.description,
    max_user: req.body.max_user,
    max_patient: req.body.max_patient,
    max_room: req.body.max_room,
    max_storege: req.body.max_storege,
    storege_unit: req.body.storege_unit,
    price: req.body.price,
    price_intervel: req.body.price_intervel,
    status: req.body.status,
    updated_at: new Date(),
  };

  const _id = req.body.id;

  if (_id !== null && _id !== "" && _id !== undefined) {
    PlanModel.findByIdAndUpdate({ _id: req.body.id }, UpdatePlanDetails, {
      upsert: true,
      new: true,
    })
      .then((result) => {
        res.status(201).json({
          success: true,
          msg: "Plan Updated Successfully",
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
      msg: "Plan Id Is Required",
      error: "",
    });
  }
};

module.exports.GetPlan = (req, res) => {
  if (req.params.id) {
    PlanModel.find({ isdeleted: false, _id: req.params.id })
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
          msg: "Plan Fetch error...",
          error: err,
        });
      });
  } else {
    PlanModel.find({ isdeleted: false })
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
          msg: "Plan Fetch error...",
          error: err,
        });
      });
  }
};

module.exports.UpdatePlanStatus = (req, res) => {
  PlanModel.find({ _id: req.body.id })
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

      PlanModel.findByIdAndUpdate({ _id: req.body.id }, updateStatus, {
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

module.exports.DeletePlan = (req, res, next) => {
  const updateStatus = {
    isdeleted: true,
    deleted_at: new Date(),
  };

  PlanModel.findByIdAndUpdate({ _id: req.body.id }, updateStatus, {
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
