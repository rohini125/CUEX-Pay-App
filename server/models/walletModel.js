const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  emailOrPhone: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Wallet", walletSchema);
