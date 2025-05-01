
import mongoose from 'mongoose';
const priceAlertSchema = new mongoose.Schema({
  currency: {
    type: String,
    required: true,
  },
  target: {
    type: Number,
    required: true,
  },
  mode: {
    type: String,
    enum: ['above', 'below'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// module.exports = mongoose.model('PriceAlert', priceAlertSchema);
export default mongoose.model('PriceAlert', priceAlertSchema);
