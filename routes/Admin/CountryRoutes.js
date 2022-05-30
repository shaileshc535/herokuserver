const express = require("express");
const Router = express.Router();
const { GetCountry } = require("../../controller/Admin/CountryController");
const { GetStateList } = require("../../controller/Admin/StateController");

Router.get("/country", GetCountry);
Router.get("/country/:id", GetCountry);
Router.get("/state/:id", GetStateList);

module.exports = Router;
