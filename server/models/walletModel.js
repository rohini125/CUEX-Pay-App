const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  emailOrPhone: {
    type: String,
    required: true,
    // unique: true,
  },
  currency: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
    required: true,
  },
});

walletSchema.index({ emailOrPhone: 1, currency: 1 }, { unique: true });

module.exports = mongoose.model("Wallet", walletSchema);

// const mongoose = require("mongoose");

// const walletSchema = new mongoose.Schema({
//   emailOrPhone: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   currency: {
//     type: String,
//     required: true,
//   },
//   amount: {
//     type: Number,
//     default: 0,
//     required: true,
//   },
// });

// module.exports = mongoose.model("Wallet", walletSchema);
