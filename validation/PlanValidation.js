const Validator = require("validator");
const isEmpty = require("./is-Empty");

module.exports = function validateInput(data) {
  let errors = {};

  data.plan_name = !isEmpty(data.plan_name) ? data.plan_name : "";
  data.price = !isEmpty(data.price) ? data.price : "";
  data.max_user = !isEmpty(data.max_user) ? data.max_user : "";
  data.max_patient = !isEmpty(data.max_patient) ? data.max_patient : "";
  data.max_storege = !isEmpty(data.max_storege) ? data.max_storege : "";
  data.max_room = !isEmpty(data.max_room) ? data.max_room : "";

  if (Validator.isEmpty(data.plan_name)) {
    errors = "Plan Name is required";
  }

  if (!Validator.isLength(data.plan_name, { min: 2, max: 50 })) {
    errors = "Plan Name must be between 3 to 50 characters";
  }

  if (Validator.isEmpty(data.price)) {
    errors = "Plan Price is required";
  }

  if (Validator.isEmpty(data.max_user)) {
    errors = "Maximum User Allowed in Plan is required";
  }

  if (Validator.isEmpty(data.max_patient)) {
    errors = "Maximum Patient Allowed in Plan is required";
  }

  if (Validator.isEmpty(data.max_storege)) {
    errors = "Maximum Storege Allowed in Plan is required";
  }

  if (Validator.isEmpty(data.max_room)) {
    errors = "Maximum Room Allowed in Plan is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
