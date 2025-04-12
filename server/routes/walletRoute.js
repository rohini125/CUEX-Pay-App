const express = require("express");
const router = express.Router();
const {
  getUserWallet,
  depositCurrency,
  withdrawCurrency,
} = require("../controllers/walletController");

// GET: Get all wallet currencies for a user
router.get("/currencies", getUserWallet);

// POST: Add or update currency balance
router.post("/deposit", depositCurrency);
router.post("/withdraw", withdrawCurrency);

module.exports = router;
