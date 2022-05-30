const InvoiceModel = require("../../model/InvoiceModel");
// const InvoiceValidation = require("../../validation/InvoiceValidation");
var mongoose = require("mongoose");

module.exports.CreateInvoice = (req, res) => {
  let newInvoice = InvoiceModel(req.body);
  newInvoice
    .save()
    .then((data) => {
      res.status(200).json({
        success: true,
        msg: "Invoice Created Successfully",
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

module.exports.UpdateInvoice = (req, res) => {
  const UpdateInvoiceDetails = {
    plan_id: req.body.plan_id,
    clinic_id: req.body.clinic_id,
    subscription_id: req.body.subscription_id,
    amount: req.body.amount,
    updated_at: new Date(),
  };

  const _id = req.body.id;

  if (_id !== null && _id !== "" && _id !== undefined) {
    InvoiceModel.findByIdAndUpdate({ _id: req.body.id }, UpdateInvoiceDetails, {
      upsert: true,
      new: true,
    })
      .then((result) => {
        res.status(201).json({
          success: true,
          msg: "Invoice Updated Successfully",
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
      msg: "Invoice Id Is Required",
      error: "",
    });
  }
};

module.exports.GetInvoice = (req, res) => {
  if (req.params.id) {
    InvoiceModel.find({ isdeleted: false, _id: req.params.id })
      .populate("plan_id")
      .populate("clinic_id")
      .populate("subscription_id")
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
          msg: "Invoice Fetch error...",
          error: err,
        });
      });
  } else {
    InvoiceModel.find({ isdeleted: false })
      .populate("plan_id")
      .populate("clinic_id")
      .populate("subscription_id")
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
          msg: "Invoice Fetch error...",
          error: err,
        });
      });
  }
};

module.exports.UpdateInvoiceStatus = (req, res) => {
  InvoiceModel.find({ _id: req.body.id })
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

      InvoiceModel.findByIdAndUpdate({ _id: req.body.id }, updateStatus, {
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

module.exports.DeleteInvoice = (req, res, next) => {
  const updateStatus = {
    isdeleted: true,
    deleted_at: new Date(),
  };

  InvoiceModel.findByIdAndUpdate({ _id: req.body.id }, updateStatus, {
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
