const User = require("../model/User");
const Invoice = require("../model/Invoice");

const editInvoiceStatusController = async (req, res) => {
  const userEmailFromAccessToken = req.email;
  const actualUser = await User.findOne({ email: userEmailFromAccessToken });
  const invoiceOfUser = await Invoice.findOne({ userId: actualUser._id });
  const listOfInvoicesOfUser = invoiceOfUser.listOfInvoices
    .filter((doc) => doc)
    .map((doc) => doc.toObject());
  const copyOfListOfInvoicesOfUsers = [...listOfInvoicesOfUser];
  const foundInvoice = copyOfListOfInvoicesOfUsers.find(
    (inv) => inv._id.toString() === req.body.editedInvoice._id
  );
  const foundInvoiceIndex = copyOfListOfInvoicesOfUsers.findIndex(
    (inv) => inv._id.toString() === req.body.editedInvoice._id
  );
  const copyOfFoundInvoice = { ...foundInvoice };
  const editedInvoice = {
    _id: copyOfFoundInvoice._id,
    ...req.body.editedInvoice,
    status: "paid",
  };
  copyOfListOfInvoicesOfUsers[foundInvoiceIndex] = editedInvoice;
  invoiceOfUser.listOfInvoices = copyOfListOfInvoicesOfUsers;
  await invoiceOfUser.save();
  res.status(201).json({
    status: "201",
    statusText: "Invoice status has been edited",
    data: editedInvoice,
    error: null,
  });
};

module.exports = { editInvoiceStatusController };
