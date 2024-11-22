const mongoose = require("mongoose");
const invoiceListSchema = new mongoose.Schema({
  userId: String,
  listOfInvoices: [
    {
      code: String,
      streetAddressOfBusinessOwner: String,
      cityOfBusinessOwner: String,
      postCodeOfBusinessOwner: String,
      countryOfBusinessOwner: String,
      clientName: String,
      clientEmail: String,
      streetAddressOfClient: String,
      cityOfClient: String,
      postCodeOfOfClient: String,
      countryOfClient: String,
      dueDate: String,
      invoiceDate: String,
      paymentTerms: String,
      projectDescription: String,
      itemsList: [
        {
          itemName: String,
          itemQuantity: Number,
          itemPrice: Number,
          total: Number,
        },
      ],
      status: String,
    },
  ],
});

const InvoiceList = mongoose.model("InvoiceList", invoiceListSchema);

module.exports = InvoiceList;
