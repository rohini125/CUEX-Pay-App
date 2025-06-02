import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import twilio from "twilio";
dotenv.config();

const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "15m" }); // Valid for 15 minutes
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

const OTP_EXPIRY = 180000;
const JWT_SECRET = process.env.JWT_SECRET;

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.OTP_EMAIL_PASS,
  },
});

const twilioClient = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

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

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 3 * 60 * 1000;
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    if (emailOrPhone.includes("+")) {
      await twilioClient.messages.create({
        body: `Your OTP is ${otp}. It is valid for 3 minutes.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: emailOrPhone,
      });
    } else {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: emailOrPhone,
        subject: "Your OTP for Login Verification",
        text: `Your OTP is ${otp}. It is valid for 3 minutes.`,
      });
    }

    return res
      .status(200)
      .json({ message: "OTP sent successfully.", emailOrPhone });
  } catch (error) {
    return res.status(500).json({ message: "Server error.", error });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  const { otp } = req.body;

  if (!otp) {
    return res.status(400).json({ message: "OTP is required" });
  }

  try {
    const user = await User.findOne({ otp });

    if (!user) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const token = jwt.sign({ userId: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "OTP verified successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// logout user
export const logoutUser = (req, res) => {
  try {
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Logout failed", error });
  }
};

export const resendOtp = async (req, res) => {
  try {
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

    if (user.otp && user.otpExpiry > Date.now()) {
      return res
        .status(400)
        .json({ message: "Please wait, OTP is still valid." });
    }
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 3 * 60 * 1000;

    user.otp = newOtp;
    user.otpExpiry = otpExpiry;
    await user.save();

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
