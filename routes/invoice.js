const express = require("express");
const router = express.Router();
const createInvoice = require("../controllers/invoiceController");
const fetchInvoice = require("../controllers/fetchController");
const editInvoice = require("../controllers/editInvoice");
const deleteInvoice = require("../controllers/deleteController");

const verifyJwt = require("../config/verifyJwt");
router
  .route("/")
  .post(verifyJwt, createInvoice.createInvoiceController)
  .get(verifyJwt, fetchInvoice.fetchInvoices)
  .patch(verifyJwt, editInvoice.editInvoiceController)
  .delete(verifyJwt, deleteInvoice.deleteInvoiceController);
module.exports = router;
