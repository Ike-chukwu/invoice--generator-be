const Invoice = require("../model/Invoice");
const User = require("../model/User");

const fetchInvoiceById = async (req, res) => {
  const userEmail = req.email;
  const user = await User.findOne({ email: userEmail });
  const invoice = await Invoice.findOne({ userId: user._id });
  // const listOfInvoicesOfUser = invoice.listOfInvoices;
  const listOfInvoicesOfUser = invoice.listOfInvoices
    .filter((doc) => doc) // Remove null/undefined entries
    .map((doc) => doc.toObject());

  const particularInvoice = listOfInvoicesOfUser.find(
    (inv) => inv._id.toString() === req.params.id
  );

  res.status(201).json({
    status: "201",
    statusText: "Invoice fetched",
    data: particularInvoice,
    error: null,
  });
};

module.exports = { fetchInvoiceById };
