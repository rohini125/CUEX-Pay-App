//////////////////// wallet final code ////////////////

const Wallet = require("../models/walletModel.js");
const Account = require("../models/Account.js"); // Assuming you have an Account model
const mongoose = require("mongoose");

// 💰 Deposit Amount
const depositCurrency = async (req, res) => {
  const { emailOrPhone, accountNumber, amount } = req.body;

  try {
    const account = await Account.findOne({ accountNumber });
    if (!account) return res.status(404).json({ error: "Account not found" });

    if (account.balance < amount) {
      return res.status(400).json({ error: "Insufficient account balance" });
    }

    // Subtract from account
    account.balance -= amount;
    await account.save();

    // Add to wallet
    let wallet = await Wallet.findOne({ emailOrPhone });
    if (wallet) {
      wallet.amount += amount;
    } else {
      wallet = new Wallet({ emailOrPhone, amount });
    }
    await wallet.save();

    res.status(200).json({ message: "Deposit successful" });
  } catch (err) {
    console.error("Deposit Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 💸 Withdraw Amount
const withdrawCurrency = async (req, res) => {
  const { emailOrPhone, accountNumber, amount } = req.body;

  try {
    const wallet = await Wallet.findOne({ emailOrPhone });
    if (!wallet) return res.status(404).json({ error: "Wallet not found" });

    if (wallet.amount < amount) {
      return res.status(400).json({ error: "Insufficient wallet balance" });
    }

    // Subtract from wallet
    wallet.amount -= amount;
    await wallet.save();

    // Add to account
    const account = await Account.findOne({ accountNumber });
    if (!account) return res.status(404).json({ error: "Account not found" });

    account.balance += amount;
    await account.save();

    res.status(200).json({ message: "Withdraw successful" });
  } catch (err) {
    console.error("Withdraw Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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

module.exports = {
  getUserWallet,
  depositCurrency,
  withdrawCurrency,
};

// const Wallet = require("../models/walletModel.js");
// const mongoose = require("mongoose");

// // GET user model dynamically to avoid circular dependency
// const User = mongoose.model("User");

// // Get wallet currencies for specific user
// const getUserWallet = async (req, res) => {
//   const { emailOrPhone } = req.query;

//   if (!emailOrPhone) {
//     return res.status(400).json({ error: "Missing emailOrPhone parameter" });
//   }

//   try {
//     const userCurrencies = await Wallet.find({ emailOrPhone });
//     res.json(userCurrencies);
//   } catch (error) {
//     console.error("Error fetching wallet data", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// // Deposit currency (wallet मध्ये add + check balance मधून minus)
// const depositCurrency = async (req, res) => {
//   const { emailOrPhone, currency, amount } = req.body;

//   if (!emailOrPhone || !currency || amount == null || amount <= 0) {
//     return res.status(400).json({ error: "Invalid deposit request" });
//   }

//   try {
//     const user = await User.findOne({ emailOrPhone });
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     if ((user.balance || 0) < amount) {
//       return res.status(400).json({ error: "Insufficient main balance" });
//     }

//     // Wallet update
//     const existing = await Wallet.findOne({ emailOrPhone, currency });

//     if (existing) {
//       existing.amount += amount;
//       await existing.save();
//     } else {
//       const newWallet = new Wallet({ emailOrPhone, currency, amount });
//       await newWallet.save();
//     }

//     // Main balance update (minus)
//     user.balance -= amount;
//     await user.save();

//     res.status(200).json({
//       message: "Deposit to wallet successful",
//       walletAmount: existing ? existing.amount : amount,
//       mainBalance: user.balance,
//     });
//   } catch (error) {
//     console.error("Error in deposit", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// // Withdraw currency (wallet मधून minus + check balance मध्ये add)
// const withdrawCurrency = async (req, res) => {
//   const { emailOrPhone, currency, amount } = req.body;

//   if (!emailOrPhone || !currency || amount == null || amount <= 0) {
//     return res.status(400).json({ error: "Invalid withdraw request" });
//   }

//   try {
//     const user = await User.findOne({ emailOrPhone });
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const existing = await Wallet.findOne({ emailOrPhone, currency });

//     if (!existing || existing.amount < amount) {
//       return res.status(400).json({ error: "Insufficient wallet balance" });
//     }

//     // Wallet update
//     existing.amount -= amount;
//     await existing.save();

//     // Main balance update (add)
//     user.balance = (user.balance || 0) + amount;
//     await user.save();

//     res.status(200).json({
//       message: "Withdrawal from wallet successful",
//       walletAmount: existing.amount,
//       mainBalance: user.balance,
//     });
//   } catch (error) {
//     console.error("Error in withdrawal", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// module.exports = {
//   getUserWallet,
//   depositCurrency,
//   withdrawCurrency,
// };
