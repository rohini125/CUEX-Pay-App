import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: String, required: true },
  time: { type: String, required: true },
  type: { type: String, enum: ['Sent', 'Received', 'Converted'], required: true },
});

const history = mongoose.model('History', historySchema);

export default history;
