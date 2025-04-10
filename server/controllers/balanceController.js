//////////////////    Using UserModel.js    //////////////////////

import User from "../models/userModel.js";

// ✅ GET: Check Balance
export const getBalance = async (req, res) => {
  const { emailOrPhone } = req.query; // ✅ Changed from req.params to req.query

  if (!emailOrPhone || emailOrPhone.trim() === "") {
    return res.status(400).json({ error: "Invalid emailOrPhone" });
  }

  try {
    const user = await User.findOne({ emailOrPhone });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ balance: user.balance || 0 });
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

// ✅ POST: Deposit Money
export const depositBalance = async (req, res) => {
  const { emailOrPhone, amount } = req.body;

  // ✅ Input validation
  const numericAmount = parseFloat(amount);
  if (
    !emailOrPhone ||
    emailOrPhone.trim() === "" ||
    isNaN(numericAmount) ||
    numericAmount <= 0
  ) {
    return res.status(400).json({
      error: "Invalid emailOrPhone or amount must be a positive number",
    });
  }

  try {
    const user = await User.findOne({ emailOrPhone });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.balance = (user.balance || 0) + numericAmount;
    await user.save();

    res.status(200).json({
      message: "Deposit successful",
      balance: user.balance,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};
