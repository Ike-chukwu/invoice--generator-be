const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");
require("dotenv").config();
app.use(cors(corsOptions));
app.use(express.json());

app.use("/registerUser", require("./routes/registerUser"));
app.use("/login", require("./routes/login"));
app.use("/invoice", require("./routes/invoice"));
app.use("/invoices", require("./routes/getInvoice"));
app.use("/editInvoiceStatus", require("./routes/editInvoiceStatus"));

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.DATABASE_URI);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  app.listen(PORT, () => {
    console.log("Port is running on port 3500");
  });
}
