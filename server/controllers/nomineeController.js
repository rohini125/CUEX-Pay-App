const Nominee = require('../models/nomineeModel.js');

// @desc    Add a nominee
// @route   POST /api/nominees
// @access  Public
const addNominee = async (req, res) => {
  const { nomineeName, relationship, contactNumber } = req.body;

  if (!nomineeName || !relationship || !contactNumber) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const nominee = new Nominee({ nomineeName, relationship, contactNumber });
    const savedNominee = await nominee.save();
    res.status(201).json(savedNominee);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

module.exports = { addNominee };
