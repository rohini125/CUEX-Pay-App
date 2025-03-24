import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

export const setUpiPin = async (req, res) => {
    try {
      const { userId, upiPin } = req.body;
  
      // Validate inputs
      if (!userId || !upiPin) {
        return res.status(400).json({ message: 'User ID and UPI PIN are required.' });
      }
  
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Check if the UPI PIN is already set
      if (user.isUpiPinSet) {
        return res.status(400).json({ message: 'UPI PIN is already set and cannot be changed.' });
      }
  
      // Hash the new UPI PIN and update the user
      const hashedUpiPin = await bcrypt.hash(upiPin, 10);
      user.upiPin = hashedUpiPin;
      user.isUpiPinSet = true;
  
      await user.save();
      res.status(200).json({ message: 'UPI PIN set successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Server error.', error });
    }
  };