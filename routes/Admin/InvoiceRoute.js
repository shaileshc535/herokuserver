const express = require("express");
const Router = express.Router();
const {
  CreateInvoice,
  DeleteInvoice,
  GetInvoice,
  UpdateInvoice,
  UpdateInvoiceStatus,
} = require("../../controller/Admin/InvoiceController");

Router.get("/invoice", GetInvoice);
Router.get("/invoice/:id", GetInvoice);
Router.post("/invoice", CreateInvoice);
Router.post("/invoice-update", UpdateInvoice);
Router.post("/invoice-delete", DeleteInvoice);
Router.post("/invoice-status", UpdateInvoiceStatus);

module.exports = Router;
