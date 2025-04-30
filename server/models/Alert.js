// import mongoose from 'mongoose';

// // 1. Create Schema
// const AlertSchema = new mongoose.Schema({
//   currency: {
//     type: String,
//     required: true,
//   },
//   targetPrice: {
//     type: Number,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // 2. Create Model
// const Alert = mongoose.model('Alert', AlertSchema);

// // 3. Export Model
// export default Alert;




const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  pair: { type: String, required: true },
  target: { type: Number, required: true },
  triggered: { type: Boolean, default: false },
});

module.exports = mongoose.model("Alert", alertSchema);