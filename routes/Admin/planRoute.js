const express = require("express");
const Router = express.Router();
const {
  DeletePlan,
  UpdatePlan,
  UpdatePlanStatus,
  CreatePlan,
  GetPlan,
} = require("../../controller/Admin/PlansController");

Router.get("/plan", GetPlan);
Router.get("/plan/:id", GetPlan);
Router.post("/plan", CreatePlan);
Router.post("/plan-update", UpdatePlan);
Router.post("/plan-delete", DeletePlan);
Router.post("/plan-status", UpdatePlanStatus);

module.exports = Router;
