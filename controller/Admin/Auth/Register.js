const UserModel = require("../../../model/userModel");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
var jwt = require("jsonwebtoken");
const validattion = require("../../../validation/RegisterValidation");
const loginValidation = require("../../../validation/LoginValidation");

if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

module.exports.registerPatient = (req, res, next) => {
  const { errors, isValid } = validattion(req.body);

  if (!isValid) {
    return res.status(400).json({
      success: false,
      msg: errors,
    });
  }

  let { email, mobile, password, password2 } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    errorsEmail = "Email already exists";
    if (user) {
      return res.status(400).json({
        success: false,
        msg: errorsEmail,
      });
    } else {
      if (password !== password2) {
        res.status(201).json({
          success: false,
          msg: "Password does not match",
        });
      } else {
        bcrypt.hash(password, 12, function (err, hash) {
          if (err) {
            return res.status(400).json({
              success: false,
              msg: "Something went wrong. Please try again",
              error: err,
            });
          } else {
            const image = gravatar.url(req.body.name, {
              s: "200", // size
              s: "200", // size
              r: "pg", // rating
              d: "mm", // default
            });
            var User = new UserModel({
              email: email,
              password: hash,
              mobile: mobile,
              image,
            });
            User.save()
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
                  msg: "Something went wrong. Please try again",
                  error: err,
                });
              });
          }
        });
      }
    }
  });
};

module.exports.registerStaff = (req, res, next) => {
  const { errors, isValid } = validattion(req.body);

  if (!isValid) {
    return res.status(400).json({
      success: false,
      msg: errors,
    });
  }

  let { email, mobile, password, password2 } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    errorsEmail = "Email already exists";
    if (user) {
      return res.status(400).json({
        success: false,
        msg: errorsEmail,
      });
    } else {
      if (password !== password2) {
        res.status(201).json({
          success: false,
          msg: "Password does not match",
        });
      } else {
        bcrypt.hash(password, 12, function (err, hash) {
          if (err) {
            return res.status(400).json({
              success: false,
              msg: "Something went wrong. Please try again",
              error: err,
            });
          } else {
            const image = gravatar.url(req.body.name, {
              s: "200", // size
              r: "pg", // rating
              d: "mm", // default
            });
            var User = new UserModel({
              email: email,
              password: hash,
              mobile: mobile,
              status: false,
              role: "Staff",
              image,
            });
            User.save()
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
                  msg: "Something went wrong. Please try again",
                  error: err,
                });
              });
          }
        });
      }
    }
  });
};

module.exports.registerClinic = (req, res, next) => {
  const { errors, isValid } = validattion(req.body);

  if (!isValid) {
    return res.status(400).json({
      success: false,
      msg: errors,
    });
  }

  let { email, mobile, password, password2 } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    errorsEmail = "Email already exists";
    if (user) {
      return res.status(400).json({
        success: false,
        msg: errorsEmail,
      });
    } else {
      if (password !== password2) {
        res.status(201).json({
          success: false,
          msg: "Password does not match",
        });
      } else {
        bcrypt.hash(password, 12, function (err, hash) {
          if (err) {
            return res.status(400).json({
              success: false,
              msg: "Something went wrong. Please try again",
              error: err,
            });
          } else {
            const image = gravatar.url(req.body.name, {
              s: "200", // size
              r: "pg", // rating
              d: "mm", // default
            });
            var User = new UserModel({
              email: email,
              password: hash,
              mobile: mobile,
              status: false,
              role: "Clinic",
              image,
            });
            User.save()
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
                  msg: "Something went wrong. Please try again",
                  error: err,
                });
              });
          }
        });
      }
    }
  });
};

module.exports.registerAdmin = (req, res, next) => {
  const { errors, isValid } = validattion(req.body);

  if (!isValid) {
    return res.status(400).json({
      success: false,
      msg: errors,
    });
  }

  let { email, mobile, password, password2 } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    errorsEmail = "Email already exists";
    if (user) {
      return res.status(400).json({
        success: false,
        msg: errorsEmail,
      });
    } else {
      if (password !== password2) {
        res.status(201).json({
          success: false,
          msg: "Password does not match",
        });
      } else {
        bcrypt.hash(password, 12, function (err, hash) {
          if (err) {
            return res.status(400).json({
              success: false,
              msg: "Something went wrong. Please try again",
              error: err,
            });
          } else {
            const image = gravatar.url(req.body.name, {
              s: "200", // size
              r: "pg", // rating
              d: "mm", // default
            });
            var User = new UserModel({
              email: email,
              password: hash,
              mobile: mobile,
              role: "Admin",
              image,
            });
            User.save()
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
                  msg: "Something went wrong. Please try again",
                  error: err,
                });
              });
          }
        });
      }
    }
  });
};

module.exports.UserLogin = (req, res, next) => {
  const { errors, isValid } = loginValidation(req.body);

  if (!isValid) {
    return res.status(400).json({
      success: false,
      msg: errors,
    });
  }

  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .exec()
    .then((result) => {
      if (result === null) {
        res.status(201).json({
          success: false,
          msg: "Invalid user information",
        });
      } else {
        bcrypt.compare(password, result.password, function (err, data) {
          if (err) {
            res.status(201).json({
              success: false,
              msg: "Authorization faild",
            });
          }
          if (data) {
            var token = jwt.sign(
              {
                id: result._id,
                first_name: result.first_name,
                mid_name: result.mid_name,
                last_name: result.last_name,
                email: result.email,
                mobile: result.mobile,
                image: result.image,
                role: result.role,
                status: result.status,
                isdeleted: result.isdeleted,
                created_at: result.created_at,
              },
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: "12h",
              }
            );
            res.status(201).json({
              success: true,
              msg: "success",
              role: result.role,
              token: token,
            });
          } else {
            res.status(400).json({
              success: false,
              msg: "Something went wrong. Please try again",
            });
          }
        });
      }
    })
    .catch((err) => {
      res.json({
        error: err,
      });
    });
};
