import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema({
  currency: { type: String, required: true },
  amount: { type: Number, required: true, default: 0 },
});

const Wallet = mongoose.model("Wallet", WalletSchema);

export default Wallet;
