const express = require("express");
const Router = new express.Router();
/* GET home page. */
Router.get("/", function (req, res) {
  res.status(200).render("index", { title: "Dental-Ms  API" });
});
module.exports = Router;
