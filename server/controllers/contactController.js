import contactModel from '../models/contactModel.js'

export const createUser = async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    // create a new user entry
    const newUser = new contactModel({
      name,
      email,
      subject,
      message
    });
    

    // save the user to the database
     await newUser.save();

    // send success response
    res.json({
      success: true,
      data: newUser,
      message: "Form submitted successfully",
    });
  } catch (e) {
    // send error response
    res.status(500).json({
      message: e.message,
    });
  }
};
export default  createUser ;