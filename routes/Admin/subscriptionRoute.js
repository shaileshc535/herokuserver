const express = require("express");
const Router = express.Router();
const {
  CreateSubscription,
  DeleteSubscription,
  GetSubscription,
  UpdateSubscription,
  UpdateSubscriptionStatus,
  getClinicSubscription,
} = require("../../controller/Admin/SubscriptionController");

Router.get("/subscription", GetSubscription);
Router.get("/subscription/:id", GetSubscription);
Router.get("/clinic-subscription/:id", getClinicSubscription);
Router.post("/subscription", CreateSubscription);
Router.post("/subscription-update", UpdateSubscription);
Router.post("/subscription-delete", DeleteSubscription);
Router.post("/subscription-status", UpdateSubscriptionStatus);

module.exports = Router;
