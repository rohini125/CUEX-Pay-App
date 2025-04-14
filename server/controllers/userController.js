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
    const {
      name,
      emailOrPhone,
      password,
      confirmPassword,
      securityQuestion,
      securityAnswer,
    } = req.body;

    if (
      !name ||
      !emailOrPhone ||
      !password ||
      !confirmPassword ||
      !securityQuestion ||
      !securityAnswer
    ) {
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
      securityQuestion,
      securityAnswer,
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
    return res.status(400).json({ message: "User session expired or invalid" });
  }

  if (userOTPData[emailOrPhone] && userOTPData[emailOrPhone] === otp) {
    let user = await User.findOne({ emailOrPhone });
    if (!user) {
      user = new User({ emailOrPhone });
      await user.save();
    }

    delete userOTPData[emailOrPhone]; // Remove used OTP
    return res.status(200).json({ message: "Login successful", user });
  }

  return res.status(400).json({ message: "Invalid OTP or expired" });
};

export const resendOtp = async (req, res) => {
  try {
    // Retrieve emailOrPhone from session or a secure source
    const emailOrPhone = req.session?.emailOrPhone;

    if (!emailOrPhone) {
      return res
        .status(400)
        .json({ message: "Session expired. Please log in again." });
    }

    const user = await User.findOne({ emailOrPhone });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if existing OTP is still valid
    if (user.otp && user.otpExpiry > Date.now()) {
      return res
        .status(400)
        .json({ message: "Please wait, OTP is still valid." });
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

export const forgotPasswordInfo = async (req, res) => {
  const { emailOrPhone } = req.body;
  console.log("Received:", emailOrPhone);
  try {
    const user = await User.findOne({ emailOrPhone: emailOrPhone.trim() });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the security question for the user
    res.status(200).json({
      message: "Security question found",
      securityQuestion: user.securityQuestion,
    });
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  const { emailOrPhone, answer, newPassword } = req.body;

  try {
    // Find the user by email or phone
    // const user = await User.findOne({
    //   $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    // });
    const user = await User.findOne({ emailOrPhone: emailOrPhone.trim() });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the answer matches the stored answer
    if (user.securityAnswer !== answer) {
      return res.status(400).json({ message: "Incorrect answer" });
    }

    // If the answer is correct, reset the password (you should hash the password before storing)
    // user.password = newPassword; // In a real app, hash this password first
    // await user.save();
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
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

// Delete user
export const deleteUserAccount = async (req, res) => {
  try {
    const { emailOrPhone } = req.body;

    // 1. Input validation
    if (!emailOrPhone || emailOrPhone.trim() === "") {
      return res
        .status(400)
        .json({ message: "Email or phone number is required." });
    }

    // 2. Debug log
    console.log("Delete request for:", emailOrPhone);

    // 3. Find and delete user
    const deletedUser = await User.findOneAndDelete({ emailOrPhone });

    if (!deletedUser) {
      console.log("User not found for:", emailOrPhone);
      return res.status(404).json({ message: "User not found." });
    }

    // 4. Success response
    console.log("User deleted:", deletedUser.emailOrPhone || deletedUser._id);
    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};

// Delete User Account
// export const deleteUserAccount = async (req, res) => {
//   try {
//     // Extract user ID from the authenticated request (assuming JWT authentication)
//     const userId = req.user.id;

//     if (!userId) {
//       return res.status(400).json({ message: "User authentication required." });
//     }

//     // Find user by ID
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     // Delete the user
//     await User.findByIdAndDelete(userId);

//     res.status(200).json({ message: "User account deleted successfully." });
//   } catch (error) {
//     console.error("Error deleting user account:", error.message);
//     res.status(500).json({
//       message: "Failed to delete user account.",
//       error: error.message,
//     });
//   }
// };
