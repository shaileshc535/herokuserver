const SubscriptionModel = require("../../model/SubscriptionModel");
var mongoose = require("mongoose");

module.exports.CreateSubscription = (req, res) => {
  let newSubscription = SubscriptionModel(req.body);
  console.log("newSubscription", newSubscription);
  newSubscription
    .save()
    .then((data) => {
      console.log("data", data);
      res.status(200).json({
        success: true,
        msg: "Subscription Created Successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log("err", err);
      res.status(400).json({
        success: false,
        msg: err.message || "Something went wrong. Please try again",
        error: err,
      });
    });
};

module.exports.UpdateSubscription = (req, res) => {
  const UpdateSubscriptionDetails = {
    customer_name: req.body.customer_name,
    mobile: req.body.mobile,
    email: req.body.email,
    paln: req.body.paln,
    plan_start: req.body.plan_start,
    plan_end: req.body.plan_end,
    paid_amount: req.body.paid_amount,
    updated_at: new Date(),
  };

  const _id = req.body.id;

  if (_id !== null && _id !== "" && _id !== undefined) {
    SubscriptionModel.findByIdAndUpdate(
      { _id: req.body.id },
      UpdateSubscriptionDetails,
      {
        upsert: true,
        new: true,
      }
    )
      .then((result) => {
        res.status(201).json({
          success: true,
          msg: "Subscription Updated Successfully",
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
      msg: "Subscription Id Is Required",
      error: "",
    });
  }
};

module.exports.GetSubscription = async (req, res) => {
  if (req.params.id) {
    await SubscriptionModel.find({ isdeleted: false, _id: req.params.id })
      .populate("clinic_id")
      .populate("paln_id")
      .exec()
      .then((result) => {
        console.log("res", res.data);
        res.status(201).json({
          success: true,
          msg: "success",
          data: result,
        });
      })
      .catch((err) => {
        console.log("error", err);
        res.json({
          success: false,
          msg: "Subscription Fetch error...",
          error: err,
        });
      });
  } else {
    SubscriptionModel.find({ isdeleted: false })
      .populate("clinic_id")
      .populate("paln_id")
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
          msg: "Subscription Fetch error...",
          error: err,
        });
      });
  }
};

module.exports.getClinicSubscription = async (req, res) => {
  if (req.params.id) {
    SubscriptionModel.find({
      isdeleted: false,
      clinic_id: req.params.id,
    })
      .populate("clinic_id")
      .populate("paln_id")
      .exec()
      .then((result) => {
        res.status(201).json({
          success: true,
          msg: "success",
          data: result,
        });
      });
  } else {
    res.status(400).json({
      success: false,
      msg: "Clinic Id is required",
      error: err,
    });
  }
};

module.exports.UpdateSubscriptionStatus = (req, res) => {
  SubscriptionModel.find({ _id: req.body.id })
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

      SubscriptionModel.findByIdAndUpdate({ _id: req.body.id }, updateStatus, {
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

module.exports.DeleteSubscription = (req, res, next) => {
  const updateStatus = {
    isdeleted: true,
    deleted_at: new Date(),
  };

  SubscriptionModel.findByIdAndUpdate({ _id: req.body.id }, updateStatus, {
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
