const User = require("../model/User");
const Invoice = require("../model/Invoice");

const deleteInvoiceController = async (req, res) => {
  const userEmailFromAccessToken = req.email;
  // console.log(userEmailFromAccessToken);
  const actualUser = await User.findOne({ email: userEmailFromAccessToken });
  const invoiceOfUser = await Invoice.findOne({ userId: actualUser._id });
  const listOfInvoicesOfUser = invoiceOfUser.listOfInvoices
    .filter((doc) => doc) // Remove null/undefined entries
    .map((doc) => doc.toObject());
  console.log(req.query.id);
  const copyOfListOfInvoicesOfUsers = [...listOfInvoicesOfUser];
  const filteredArray = copyOfListOfInvoicesOfUsers.filter(
    (inv) => inv._id.toString() != req.query.id
  );

  invoiceOfUser.listOfInvoices = filteredArray;
  await invoiceOfUser.save();
  res.status(201).json({
    status: "201",
    statusText: "Invoice edited",
    data: "Yes",
    error: null,
  });
  // const {} = req.params.id
};

module.exports = { deleteInvoiceController };
