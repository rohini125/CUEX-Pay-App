import Wallet from "../models/walletModel.js";

// Get Wallet Data
export const getWallet = async (req, res) => {
  try {
    const wallet = await Wallet.find();
    res.json(wallet);
  } catch (error) {
    res.status(500).json({ message: "Error fetching wallet data" });
  }
};

// Deposit Money
export const depositMoney = async (req, res) => {
  const { currency, amount } = req.body;

  try {
    let wallet = await Wallet.findOne({ currency });

    if (wallet) {
      wallet.amount += amount;
      await wallet.save();
    } else {
      wallet = new Wallet({ currency, amount });
      await wallet.save();
    }

    res.status(200).json({ message: "Deposit successful", wallet });
  } catch (error) {
    res.status(500).json({ message: "Deposit failed" });
  }
};

// Withdraw Money
export const withdrawMoney = async (req, res) => {
  const { currency, amount } = req.body;

  try {
    let wallet = await Wallet.findOne({ currency });

    if (!wallet || wallet.amount < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    wallet.amount -= amount;
    await wallet.save();

    res.status(200).json({ message: "Withdrawal successful", wallet });
  } catch (error) {
    res.status(500).json({ message: "Withdrawal failed" });
  }
};
