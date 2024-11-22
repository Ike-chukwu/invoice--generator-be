const User = require("../model/User");
const Invoice = require("../model/Invoice");

const fetchInvoices = async (req, res) => {
  const userEmail = req.email;
  const user = await User.findOne({ email: userEmail });
  const invoice = await Invoice.findOne({ userId: user._id });
  const listOfInvoicesUser = invoice.listOfInvoices;
  // console.log(invoice);

  res.status(201).json({
    status: "201",
    statusText: "List of Invoices fetched",
    data: listOfInvoicesUser,
    error: null,
  });
};

module.exports = { fetchInvoices };
