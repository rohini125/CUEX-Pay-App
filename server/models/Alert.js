// import mongoose from 'mongoose';
// const alertSchema = new mongoose.Schema({
//   pair: { type: String, required: true },
//   target: { type: Number, required: true },
//   triggered: { type: Boolean, default: false },
// });

// module.exports = mongoose.model("Alert", alertSchema);


import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  pair: {
    type: String,
    required: true
  },
  target: {
    type: Number,
    required: true
  },
  triggered: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Alert = mongoose.model('Alert', alertSchema);

export default Alert;  // Export as default
