import axios from "axios";
import Conversion from "../models/conversionModel.js";
import Wallet from "../models/walletModel.js";

export const convertCurrency = async (req, res) => {
  console.log("▶️ convertCurrency API called");
  const { emailOrPhone, fromCurrency, toCurrency, amount } = req.body;

  if (
    !emailOrPhone ||
    !fromCurrency ||
    !toCurrency ||
    amount == null ||
    amount <= 0
  ) {
    return res.status(400).json({ error: "Missing or invalid parameters" });
  }

  try {
    // ✅ Check wallet balance
    let wallet = await Wallet.findOne({ emailOrPhone, currency: fromCurrency });

    if (!wallet || wallet.amount < amount) {
      return res.status(400).json({ error: "Insufficient wallet balance" });
    }

    // ✅ Deduct from wallet
    wallet.amount -= amount;
    await wallet.save();

    // ✅ Fetch exchange rate
    const response = await axios.get(
      `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      // `https://open.er-api.com/v6/latest/${fromCurrency}`
    );

    const data = response.data;
    const rate = data.rates[toCurrency];

    if (!rate) {
      return res.status(400).json({ error: "Invalid currency selection" });
    }

    const convertedAmount = parseFloat((amount * rate).toFixed(2));

    // ✅ Credit to target currency wallet
    let targetWallet = await Wallet.findOne({
      emailOrPhone,
      currency: toCurrency,
    });

    if (targetWallet) {
      targetWallet.amount += convertedAmount;
    } else {
      targetWallet = new Wallet({
        emailOrPhone,
        currency: toCurrency,
        amount: convertedAmount,
      });
    }

    await targetWallet.save();

    // ✅ Save conversion history
    console.log("Saving new conversion:", {
      emailOrPhone,
      fromCurrency,
      toCurrency,
      amount,
      convertedAmount,
      rate,
    });
    // ✅ Save conversion history
    const newConversion = new Conversion({
      emailOrPhone,
      fromCurrency,
      toCurrency,
      amount,
      convertedAmount,
      rate,
    });

    await newConversion.save();

    res.status(200).json({
      success: true,
      convertedAmount,
      rate,
      historyId: newConversion._id,
      walletBalance: wallet.amount,
    });
  } catch (error) {
    // console.error("Error converting currency:", error.message);
    console.error("Error converting currency:", error.message, error.stack);
    // console.error("Error converting currency:", error);
    res.status(500).json({ error: "Currency conversion failed" });
  }
};

// Get conversion history
export const getHistory = async (req, res) => {
  try {
    const history = await Conversion.find().sort({ date: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ error: "Failed to fetch conversion history" });
  }
};

// Clear history
export const clearHistory = async (req, res) => {
  try {
    await Conversion.deleteMany();
    res
      .status(200)
      .json({ success: true, message: "History cleared successfully" });
  } catch (error) {
    console.error("Error clearing history:", error);
    res.status(500).json({ error: "Failed to clear history" });
  }
};
