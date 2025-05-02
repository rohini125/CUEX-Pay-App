// //////////////////// wallet final code ////////////////

const Wallet = require("../models/walletModel.js");
const Account = require("../models/Account.js"); // Account model import कर

const mongoose = require("mongoose");

// GET user model dynamically to avoid circular dependency
const User = mongoose.model("User");

// Get wallet currencies for specific user
const getUserWallet = async (req, res) => {
  const { emailOrPhone } = req.query;

  if (!emailOrPhone) {
    return res.status(400).json({ error: "Missing emailOrPhone parameter" });
  }

  try {
    const userCurrencies = await Wallet.find({ emailOrPhone });
    res.json(userCurrencies);
  } catch (error) {
    console.error("Error fetching wallet data", error);
    res.status(500).json({ error: "Server error" });
  }
};

// 💰 Deposit Amount

const depositCurrency = async (req, res) => {
  const { emailOrPhone, accountNumber, amount } = req.body;

  try {
    // 1. Account verify कर
    const account = await Account.findOne({
      emailorphone: emailOrPhone,
      accountNumber,
    });

    if (!account) {
      return res.status(404).json({ error: "Bank account not found" });
    }

    // 2. Account मध्ये पुरेसा balance आहे का ते check कर
    if (account.balance < amount) {
      return res.status(400).json({ error: "Insufficient bank balance" });
    }

    // 3. Bank account चा balance कमी कर
    account.balance -= amount;
    await account.save();

    // 4. Wallet मध्ये पैसे जमा कर INR म्हणून
    let wallet = await Wallet.findOne({
      emailOrPhone,
      currency: "INR", // Fixed currency as INR
    });

    if (wallet) {
      wallet.amount += amount;
    } else {
      wallet = new Wallet({ emailOrPhone, currency: "INR", amount });
    }

    await wallet.save();

    res
      .status(200)
      .json({ message: "Amount deposited to wallet successfully" });
  } catch (err) {
    console.error("Deposit Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const withdrawCurrency = async (req, res) => {
  const { emailOrPhone, accountNumber, amount } = req.body;

  try {
    const wallet = await Wallet.findOne({
      emailOrPhone,
      currency: "INR", // 🛠️ FIXED: previously it was accountNumber
    });

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    if (wallet.amount < amount) {
      return res.status(400).json({ error: "Insufficient wallet balance" });
    }

    wallet.amount -= amount;
    await wallet.save();

    const account = await Account.findOne({
      emailorphone: emailOrPhone,
      accountNumber,
    });

    if (!account) {
      return res.status(404).json({ error: "Bank account not found" });
    }

    account.balance += amount;
    await account.save();

    res.status(200).json({ message: "Amount withdrawn successfully" });
  } catch (err) {
    console.error("Withdraw Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// module.exports = router;
module.exports = {
  getUserWallet,
  depositCurrency,
  withdrawCurrency,
};
