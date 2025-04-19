const express = require("express");
const router = express.Router();
const { depositAmount } = require("../controllers/transferController.js");

// Route to create a new account
router.post("/transfer", depositAmount);

module.exports = router;
