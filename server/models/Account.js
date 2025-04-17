const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    bankName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    emailorphone: { type: String, required: true },
    balance: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Account", accountSchema);
