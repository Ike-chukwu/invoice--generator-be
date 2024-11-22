const User = require("../model/User");
const Invoice = require("../model/Invoice");

const editInvoiceController = async (req, res) => {
  const userEmailFromAccessToken = req.email;
  // console.log(userEmailFromAccessToken);
  const actualUser = await User.findOne({ email: userEmailFromAccessToken });
  const invoiceOfUser = await Invoice.findOne({ userId: actualUser._id });
  const listOfInvoicesOfUser = invoiceOfUser.listOfInvoices
    .filter((doc) => doc) // Remove null/undefined entries
    .map((doc) => doc.toObject());
  const copyOfListOfInvoicesOfUsers = [...listOfInvoicesOfUser];
  const particularInvoice = copyOfListOfInvoicesOfUsers.find(
    (inv) => inv._id.toString() === req.body.editedInvoice._id
  );
  const particularInvoiceIndex = copyOfListOfInvoicesOfUsers.findIndex(
    (inv) => inv._id.toString() ===  req.body.editedInvoice._id
  );
  const particularInvoiceCopy = { ...particularInvoice };
  const editedInvoice = {
    _id: particularInvoiceCopy._id,
    ...req.body.editedInvoice,
  };
  copyOfListOfInvoicesOfUsers[particularInvoiceIndex] = editedInvoice;
  invoiceOfUser.listOfInvoices = copyOfListOfInvoicesOfUsers;
  await invoiceOfUser.save();
  res.status(201).json({
    status: "201",
    statusText: "Invoice edited",
    data: editedInvoice,
    error: null,
  });
  // const {} = req.params.id
};

module.exports = { editInvoiceController };
