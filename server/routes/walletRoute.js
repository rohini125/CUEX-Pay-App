const express = require("express");
const router = express.Router();
const {
  getUserWallet,
  depositCurrency,
  withdrawCurrency,
  getCurrency,
  transferCurrency,
} = require("../controllers/walletController");

// GET: Get all wallet currencies for a user
router.get("/currencies", getUserWallet);

// GET: Get all wallet currencies wallet transfer
router.get("/currencies", getCurrency);
// router.get("/:emailOrPhone/currencies", getCurrency);

// POST: Add or update currency balance
router.post("/deposit", depositCurrency);
router.post("/withdraw", withdrawCurrency);

router.post("/transfer", transferCurrency);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const {
//   getUserWallet,
//   depositCurrency,
//   withdrawCurrency,
// } = require("../controllers/walletController");

// // GET: Get all wallet currencies for a user
// router.get("/currencies", getUserWallet);

// // POST: Add or update currency balance
// router.post("/deposit", depositCurrency);
// router.post("/withdraw", withdrawCurrency);

// module.exports = router;
