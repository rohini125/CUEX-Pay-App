import mongoose from 'mongoose';

const UpiPinSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    pin: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('UpiPin', UpiPinSchema);

