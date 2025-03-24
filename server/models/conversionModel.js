import mongoose from "mongoose";

const conversionSchema = new mongoose.Schema({
  fromCurrency: { type: String, required: true },
  toCurrency: { type: String, required: true },
  amount: { type: Number, required: true },
  convertedAmount: { type: Number, required: true },
  rate: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Conversion = mongoose.model("Conversion", conversionSchema);

export default Conversion;
