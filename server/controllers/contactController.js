// import contactModel from '../models/contactModel.js'

// export const createUser = async (req, res) => {
//   const { name, email, subject, message } = req.body;
//   try {
//     // create a new user entry
//     const newUser = new contactModel({
//       name,
//       email,
//       subject,
//       message
//     });
    

//     // save the user to the database
//      await newUser.save();

//     // send success response
//     res.json({
//       success: true,
//       data: newUser,
//       message: "Form submitted successfully",
//     });
//   } catch (e) {
//     // send error response
//     res.status(500).json({
//       message: e.message,
//     });
//   }
// };
// export default  createUser ;









// // controllers/contactController.js

// import contactModel from '../models/contactModel.js';

// export const createUser = async (req, res) => {
//   const { name, email, subject, message } = req.body;

//   if (!name || !email || !subject || !message) {
//     return res.status(400).json({ success: false, message: 'All fields are required' });
//   }

//   try {
//     const newUser = new contactModel({
//       name,
//       email,
//       subject,
//       message,
//     });

//     await newUser.save();

//     res.status(201).json({
//       success: true,
//       data: newUser,
//       message: 'Form submitted successfully',
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error: ' + error.message,
//     });
//   }
// };

// export default createUser;














import contactModel from '../models/contactModel.js';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const submitContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  try {
    const newContact = new contactModel({ name, email, subject, message });
    await newContact.save();
    return res.status(201).json({ message: 'Message saved successfully!' });
  } catch (error) {
    console.error('❌ Save Error:', error);
    return res.status(500).json({ message: 'Failed to save contact. Try again later.' });
  }
};
