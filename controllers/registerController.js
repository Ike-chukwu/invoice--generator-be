const User = require("../model/User");
const InvoiceList = require("../model/Invoice");

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and Password fields must be filled" });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .sendStatus(409)
      .json({ message: "A user with this email already exists" });
  }
  const newUser = await User.create({ email, password });
  const invoiceListOfNewUser = await InvoiceList.create({
    userId: newUser._id,
    listOfInvoices: [],
  });
  res
    .status(201)
    .json({ message: "User created successfully", invoiceListOfNewUser });
};

module.exports = { registerUser };
