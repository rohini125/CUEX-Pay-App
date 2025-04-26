import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

export const setUpiPin = async (req, res) => {
  const { upiPin, confirmUpiPin } = req.body;

  if (upiPin !== confirmUpiPin) {
    return res.status(400).json({ message: 'UPI PINs do not match' });
  }

  try {
    const user = await User.findById(req.user._id); // Automatically get authenticated user

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.isUpiPinSet) return res.status(400).json({ message: 'UPI PIN already set' });

    const hashedPin = await bcrypt.hash(upiPin, 10);
    user.upiPin = hashedPin;
    user.isUpiPinSet = true;
    await user.save();

    res.status(200).json({ message: 'UPI PIN set successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error setting UPI PIN', error: err.message });
  }
};


export const resetUpiPin = async (req, res) => {
  const { newUpiPin, confirmNewUpiPin } = req.body;

  if (newUpiPin !== confirmNewUpiPin) {
    return res.status(400).json({ message: 'New UPI PINs do not match' });
  }

  try {
    const user = await User.findById(req.user._id); // Automatically get authenticated user

    if (!user || !user.isUpiPinSet) {
      return res.status(404).json({ message: 'User or UPI PIN not found' });
    }

    const hashedPin = await bcrypt.hash(newUpiPin, 10);
    user.upiPin = hashedPin;
    user.updatedAt = new Date(); // Track reset time
    await user.save();

    res.status(200).json({ message: 'UPI PIN reset successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error resetting UPI PIN', error: err.message });
  }
};
