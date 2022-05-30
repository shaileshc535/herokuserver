const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));

router.use("/", require("./planRoute"));

router.use("/", require("./subscriptionRoute"));

router.use("/", require("./ClinicRoute"));

router.use("/", require("./CountryRoutes"));

router.use("/", require("./ClinicUserRoute"));

router.use("/", require("./InvoiceRoute"));

module.exports = router;
