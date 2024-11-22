const mongoose = require("mongoose");
const User = require("../model/User");
const Invoice = require("../model/Invoice");

const createInvoiceController = async (req, res) => {
  const userEmailFromAccessToken = req.email;
  // console.log(userEmailFromAccessToken);
  const actualUser = await User.findOne({ email: userEmailFromAccessToken });
  const invoiceOfUser = await Invoice.findOne({ userId: actualUser._id });
  let newListOfInvoices;
  if (!invoiceOfUser || !Array.isArray(invoiceOfUser.listOfInvoices)) {
    newListOfInvoices = [req.body];
  } else {
    newListOfInvoices = [...invoiceOfUser?.listOfInvoices, req.body];
  }
  invoiceOfUser.listOfInvoices = newListOfInvoices;
  const updatedInvoice = await invoiceOfUser.save();

  res.status(201).json({
    status: "201",
    statusText: "Invoice created",
    data: invoiceOfUser,
    error: null,
  });
};

module.exports = { createInvoiceController };
