const StateModel = require("../../model/StateModel");

module.exports.GetStateList = (req, res) => {
  let id = req.params.id;
  if (req.params.id) {
    StateModel.find({ isdeleted: 1, country_id: parseInt(id) })
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
          msg: "States Fetch error...",
          error: err,
        });
      });
  } else {
    res.json({
      success: false,
      msg: "Country Id Is required",
      error: err,
    });
  }
};
