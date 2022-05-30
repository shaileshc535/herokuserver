const Validator = require("validator");
const isEmpty = require("./is-Empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.mobile = !isEmpty(data.mobile) ? data.mobile : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (Validator.isEmpty(data.mobile)) {
    errors = "Mobile Number is required";
  }

  if (!Validator.isLength(data.mobile, { min: 6, max: 30 })) {
    errors = "Mobile Number must be 10 digits long";
  }

  if (Validator.isEmpty(data.email)) {
    errors = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors = "Password must be between 6 and 30 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors = "Confirm Password field is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors = "Password must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
