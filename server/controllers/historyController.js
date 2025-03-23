import History from '../models/history.js';

// Fetch all history data
export const getHistory = async (req, res) => {
  try {
    const sent = await History.find({ type: 'Sent' });
    const received = await History.find({ type: 'Received' });
    const converted = await History.find({ type: 'Converted' });

    res.status(200).json({ sent, received, converted });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching history data', error: error.message });
  }
};

// Create a new history record
export const createHistory = async (req, res) => {
  const { name, amount, time, type } = req.body;

  if (!name || !amount || !time || !type) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newHistory = new History({ name, amount, time, type });
    await newHistory.save();

    res.status(201).json({ message: 'Transaction history added successfully', newHistory });
  } catch (error) {
    res.status(500).json({ message: 'Error adding transaction history', error: error.message });
  }
};
