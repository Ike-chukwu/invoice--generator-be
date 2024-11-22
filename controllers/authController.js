const User = require("../model/User");
const UsersListOfInvoice = require("../model/Invoice");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password must be provided" });
  }
  const exisingUser = await User.findOne({ email });

  if (exisingUser && password == exisingUser.password) {
    const accessToken = jwt.sign(
      { email: exisingUser.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { email: exisingUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "3h" }
    );
    return res.status(200).json({
      message: "User successfully logged in",
      accessToken,
      refreshToken,
      userId: exisingUser._id,
    });
  }
  return res.status(404).json({ message: "User does not exist" });
};

module.exports = { authController };
