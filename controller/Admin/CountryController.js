const CountryModel = require("../../model/CountryModel");

module.exports.GetCountry = (req, res) => {
  if (req.params.id) {
    CountryModel.find({ visible: 1, _id: req.params.id })
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
          msg: "Country Fetch error...",
          error: err,
        });
      });
  } else {
    CountryModel.find({ visible: 1 })
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
          msg: "Country Fetch error...",
          error: err,
        });
      });
  }
};
