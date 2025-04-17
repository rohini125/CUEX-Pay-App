const express = require("express");
const router = express.Router();
const {
  getAccounts,
  createAccount,
  getBalance,
  depositAmount,
} = require("../controllers/accountController");

// Route to get accounts by email or phone
router.get("/getaccounts", getAccounts);

// Route to create a new account
router.post("/accounts", createAccount);

// Route to get balance of an account
router.get("/account/:id/balance", getBalance);

// Route to deposit money into an account
router.post("/account/:id/deposit", depositAmount);

module.exports = router;
