const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  pair: { type: String, required: true },
  target: { type: Number, required: true },
  triggered: { type: Boolean, default: false },
});

module.exports = mongoose.model("Alert", alertSchema);
