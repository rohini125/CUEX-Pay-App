const mongoose = require('mongoose');

const nomineeSchema = new mongoose.Schema({
  nomineeName: {
    type: String,
    required: true,
  },
  relationship: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Nominee', nomineeSchema);
