const Account = require("../models/Account");

// GET accounts by emailorphone
exports.getAccounts = async (req, res) => {
  const { emailorphone } = req.query;

  try {
    const accounts = await Account.find({ emailorphone });
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// POST new account
exports.createAccount = async (req, res) => {
  const { bankName, accountNumber, emailorphone } = req.body;

  if (!bankName || !accountNumber || !emailorphone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Only one account per bank per user
    const existing = await Account.findOne({
      bankName: bankName.trim().toLowerCase(),
      emailorphone,
    });

    if (existing) {
      return res
        .status(409)
        .json({ error: "Account already exists for this bank" });
    }

    const newAccount = await Account.create({
      bankName,
      accountNumber,
      emailorphone,
    });
    res.status(201).json(newAccount);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// GET balance of an account by account ID
exports.getBalance = async (req, res) => {
  const { id } = req.params;

  try {
    const account = await Account.findById(id);
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }
    res.json({ balance: account.balance });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// POST to deposit money into an account
exports.depositAmount = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  try {
    const account = await Account.findById(id);
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    account.balance += amount; // Add deposit to balance
    await account.save();

    res.json({ newBalance: account.balance });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};
