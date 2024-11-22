const express = require("express");
const router = express.Router();
const loginHandler = require("../controllers/authController");

router.post("/", loginHandler.authController);

module.exports = router;
