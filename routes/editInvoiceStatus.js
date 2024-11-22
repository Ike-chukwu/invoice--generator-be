const express = require("express");
const router = express.Router();
const editInvoiceController = require("../controllers/editInvoiceStatus");

const verifyJwt = require("../config/verifyJwt");
router
  .route("/")
  .patch(verifyJwt, editInvoiceController.editInvoiceStatusController);

module.exports = router;
