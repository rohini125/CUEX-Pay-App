import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

// Utility functions to generate tokens
const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "15m" }); // Valid for 15 minutes
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  }); // Valid for 7 days
};

// Environment configurations
const OTP_EXPIRY = 180000; // in milliseconds (3 minutes)
const JWT_SECRET = process.env.JWT_SECRET;

// Nodemailer configuration (Email OTP)
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email provider

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.OTP_EMAIL_PASS,
  },
});

// Twilio configuration (SMS OTP)
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// User Signup
export const registerUser = async (req, res) => {
  try {
    const { name, emailOrPhone, password, confirmPassword } = req.body;

    if (!name || !emailOrPhone || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const existingUser = await User.findOne({ emailOrPhone });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash password and save user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      emailOrPhone,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findOne({ emailOrPhone });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid email/phone or password." });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + OTP_EXPIRY;

    // Save OTP and expiry in the user record
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Check if emailOrPhone is a phone number (starts with +)
    if (emailOrPhone.includes("+")) {
      // Send OTP via SMS (for phone numbers)
      await twilioClient.messages.create({
        body: `Your OTP is ${otp}. It is valid for 3 minutes.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: emailOrPhone, // Mobile number should be in international format (e.g., +911234567890)
      });
    } else {
      // Send OTP via Email (if it's an email address)
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: emailOrPhone, // Email address
        subject: "Your OTP for Login Verification",
        text: `Your OTP is ${otp}. It is valid for 3 minutes.`,
      });
    }

    res.status(200).json({ message: "OTP sent via email and/or SMS.", otp });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};


// export const requestSendOtp = async (req, res) => {
//   try {
//     const { emailOrPhone } = req.body;

//     if (!emailOrPhone) {
//       return res.status(400).json({ message: "Email or phone number is required." });
//     }

//     let user = await User.findOne({ emailOrPhone });

//     if (!user) {
//       // If user doesn't exist, create a new one (optional based on your use case)
//       user = new User({ emailOrPhone });
//       await user.save();
//     }

//     // Generate 6-digit OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpiry = Date.now() + OTP_EXPIRY;

//     // Save OTP and expiry in the user record
//     user.otp = otp;
//     user.otpExpiry = otpExpiry;
//     await user.save();

//     // Store emailOrPhone in session for verification
//     req.session.emailOrPhone = emailOrPhone;

//     // Send OTP via SMS or Email
//     if (emailOrPhone.includes("+")) {
//       await twilioClient.messages.create({
//         body: `Your OTP is ${otp}. It is valid for 3 minutes.`,
//         from: process.env.TWILIO_PHONE_NUMBER,
//         to: emailOrPhone,
//       });
//     } else {
//       await transporter.sendMail({
//         from: process.env.EMAIL_USER,
//         to: emailOrPhone,
//         subject: "Your OTP for Login Verification",
//         text: `Your OTP is ${otp}. It is valid for 3 minutes.`,
//       });
//     }

//     res.status(200).json({ message: "OTP sent via email and/or SMS." });
//   } catch (error) {
//     res.status(500).json({ message: "Server error.", error });
//   }
// };

// // Verify OTP and login user
// export const verifyOtp = async (req, res) => {
//   try {
//     const { otp } = req.body;
//     const emailOrPhone = req.session?.emailOrPhone;

//     if (!emailOrPhone) {
//       return res.status(400).json({ message: "Session expired. Please request OTP again." });
//     }

//     const user = await User.findOne({ emailOrPhone });

//     if (!user || !user.otp || user.otpExpiry < Date.now()) {
//       return res.status(400).json({ message: "Invalid or expired OTP." });
//     }

//     if (user.otp !== otp) {
//       return res.status(400).json({ message: "Incorrect OTP." });
//     }

//     // OTP verification successful, clear OTP from the database
//     user.otp = null;
//     user.otpExpiry = null;
//     await user.save();

//     // Clear session
//     req.session.emailOrPhone = null;

//     res.status(200).json({ message: "Login successful", user });
//   } catch (error) {
//     res.status(500).json({ message: "Server error.", error });
//   }
// };

// // Resend OTP
// export const resendOtp = async (req, res) => {
//   try {
//     const emailOrPhone = req.session?.emailOrPhone;

//     if (!emailOrPhone) {
//       return res.status(400).json({ message: "Session expired. Please request OTP again." });
//     }

//     const user = await User.findOne({ emailOrPhone });

//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     // Check if existing OTP is still valid
//     if (user.otp && user.otpExpiry > Date.now()) {
//       return res.status(400).json({ message: "Please wait, OTP is still valid." });
//     }

//     // Generate a new OTP
//     const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpiry = Date.now() + OTP_EXPIRY;

//     // Update user record with new OTP
//     user.otp = newOtp;
//     user.otpExpiry = otpExpiry;
//     await user.save();

//     // Send OTP via SMS or Email
//     if (emailOrPhone.includes("+")) {
//       await twilioClient.messages.create({
//         body: `Your OTP is ${newOtp}. It is valid for 3 minutes.`,
//         from: process.env.TWILIO_PHONE_NUMBER,
//         to: emailOrPhone,
//       });
//     } else {
//       await transporter.sendMail({
//         from: process.env.EMAIL_USER,
//         to: emailOrPhone,
//         subject: "Your OTP for Login Verification",
//         text: `Your OTP is ${newOtp}. It is valid for 3 minutes.`,
//       });
//     }

//     res.status(200).json({ message: "New OTP sent successfully." });
//   } catch (error) {
//     res.status(500).json({ message: "Server error.", error });
//   }
// };

// Verify OTP
export const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  const emailOrPhone = req.session?.emailOrPhone; // Retrieve from session or a secure source

  if (!emailOrPhone) {
    return res.status(400).json({ message: 'User session expired or invalid' });
  }

  if (userOTPData[emailOrPhone] && userOTPData[emailOrPhone] === otp) {
    let user = await User.findOne({ emailOrPhone });
    if (!user) {
      user = new User({ emailOrPhone });
      await user.save();
    }

    delete userOTPData[emailOrPhone]; // Remove used OTP
    return res.status(200).json({ message: 'Login successful', user });
  }

  return res.status(400).json({ message: 'Invalid OTP or expired' });
};

export const resendOtp = async (req, res) => {
  try {
    // Retrieve emailOrPhone from session or a secure source
    const emailOrPhone = req.session?.emailOrPhone;

    if (!emailOrPhone) {
      return res.status(400).json({ message: "Session expired. Please log in again." });
    }

    const user = await User.findOne({ emailOrPhone });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if existing OTP is still valid
    if (user.otp && user.otpExpiry > Date.now()) {
      return res.status(400).json({ message: "Please wait, OTP is still valid." });
    }

    // Generate a new OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 3 * 60 * 1000; // OTP valid for 3 minutes

    // Update user record with new OTP
    user.otp = newOtp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP via SMS or Email
    if (emailOrPhone.includes("+")) {
      await twilioClient.messages.create({
        body: `Your OTP is ${newOtp}. It is valid for 3 minutes.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: emailOrPhone,
      });
    } else {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: emailOrPhone,
        subject: "Your OTP for Login Verification",
        text: `Your OTP is ${newOtp}. It is valid for 3 minutes.`,
      });
    }

    res.status(200).json({ message: "New OTP sent successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });

  }
};



// OTP Verification
// export const verifyOtp = async (req, res) => {
//   try {
//     const { otp } = req.body;

//     // Check if OTP is provided
//     if (!otp) {
//       return res.status(400).json({ message: "OTP is required." });
//     }

//     // Find the user by OTP
//     const user = await User.findOne({ otp });

//     // If no user is found with the given OTP
//     if (!user) {
//       return res
//         .status(404)
//         .json({ message: "User not found for the provided OTP." });
//     }

//     // Validate the OTP expiration time
//     if (Date.now() > user.otpExpiry) {
//       return res.status(400).json({ message: "OTP has expired." });
//     }

//     // Generate Access Token and Refresh Token
//     const accessToken = generateAccessToken(user._id);
//     const refreshToken = generateRefreshToken(user._id);

//     // Hash the Refresh Token before saving to the database
//     const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
//     user.refreshToken = hashedRefreshToken; // Save hashed Refresh Token in database
//     await user.save();

//     // Set tokens as cookies (httpOnly for security)
//     res.cookie("accessToken", accessToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 15 * 60 * 1000, // 15 minutes
//     });

//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     });

//     // Clear OTP fields in the user record after successful verification
//     user.otp = null;
//     user.otpExpiry = null;
//     await user.save();

//     res.status(200).json({
//       message: "OTP verified successfully! You are now login successfully !.",
//     });
//   } catch (error) {
//     console.error("Error in verifyOtp:", error.message);
//     res.status(500).json({
//       message: "Failed to verify OTP.",
//       error: error.message,
//     });
//   }
// };

//request to send link for reset  password

export const requestPasswordReset = async (req, res) => {
  try {
    const { emailOrPhone } = req.body;

    // Validate input
    if (!emailOrPhone) {
      return res
        .status(400)
        .json({ message: "Email or phone number is required." });
    }

    // Find the user
    const user = await User.findOne({ emailOrPhone });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate reset token

    const resetToken = Math.random().toString(36).substring(2, 8).toUpperCase();
    console.log("Generated fallback reset token:", resetToken);

    const hashedToken = await bcrypt.hash(resetToken, 10);
    console.log("Hashed token created successfully:", hashedToken);

    // Save token and expiration in database
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1-hour expiration
    await user.save();

    console.log("reached");

    const resetLink = `${req.protocol}://${req.get(
      "host"
    )}/reset-password?token=${resetToken}&emailOrPhone=${encodeURIComponent(
      emailOrPhone
    )}`;

    // const resetLink = `${req.protocol}://${req.get('host')}/reset-password?token=${resetToken}&emailOrPhone=${emailOrPhone}`;

    if (emailOrPhone.includes("+")) {
      // Send OTP via SMS (for phone numbers)
      await twilioClient.messages.create({
        body: `Your password reset code is: ${resetToken}. This code will expire in 1 hour.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        subject: "Reset Password Request",
        to: emailOrPhone, // Mobile number should be in international format (e.g., +911234567890)
      });
      res
        .status(200)
        .json({ message: "Password reset code sent via SMS successfully." });
    } else {
      // Send OTP via Email (if it's an email address)
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: emailOrPhone, // Email address
        subject: "Reset Password Request",
        text: `Use the following code to reset your password: ${resetToken}.\nAlternatively, click the link below:\n\n${resetLink}`,
      });
    }
    res
      .status(200)
      .json({ message: "Password reset link sent via email successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    // Validate input fields
    if (!token || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    // Find the user using the reset token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Ensure token is not expired
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    // Update user's password
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined; // Clear the reset token
    user.resetPasswordExpires = undefined; // Clear the token expiry
    await user.save();

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .json({ message: "No refresh token found in cookies." });
    }

    // Remove refresh token from the database
    const user = await User.findOne({});
    if (user) {
      user.refreshToken = null; // Clear refreshToken from the database
      await user.save();
    }

    // Remove the token from the database (clear refreshToken field)

    user.refreshToken = null;
    await user.save();

    // Clear cookies on the client
    res.clearCookie("accessToken", { httpOnly: true });
    res.clearCookie("refreshToken", { httpOnly: true });

    res.status(200).json({ message: "Logout successful. Tokens removed." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};

// Delete User Account
export const deleteUserAccount = async (req, res) => {
  try {
    // Extract user ID from the authenticated request (assuming JWT authentication)
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: "User authentication required." });
    }

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Delete the user
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User account deleted successfully." });
  } catch (error) {
    console.error("Error deleting user account:", error.message);
    res.status(500).json({
      message: "Failed to delete user account.",
      error: error.message,
    });
  }
};

