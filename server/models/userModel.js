// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     emailOrPhone: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     securityQuestion: { type: String, required: true },
//     securityAnswer: { type: String, required: true },
//     otp: { type: String },
//     otpExpiry: { type: Date },
//     upiPin: { type: String }, // Store hashed UPI PIN
//     isUpiPinSet: { type: Boolean, default: false }, // Default to false
//     refreshToken: { type: String, default: null }, // Field to store JWT token
//     resetPasswordToken: String,
//     resetPasswordExpires: Date,

//     balance: {
//       type: Number,
//       default: 0,
//     },
//   },

//   { timestamps: true }
// );

// export default mongoose.model("User", userSchema);
// ✅ BACKEND: Mongoose Schema (userModel.js)
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    emailOrPhone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    securityQuestion: { type: String, required: true },
    securityAnswer: { type: String, required: true },
    otp: { type: String },
    otpExpiry: { type: Date },
    upiPin: { type: String },
    isUpiPinSet: { type: Boolean, default: false },
    refreshToken: { type: String, default: null },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    balance: { type: Number, default: 0 },

    // ✅ Profile Fields
    username: String,
    profileImage: String,
    mobile: String,
    email: String,
    upiId: String,
    gender: String,
    maritalStatus: String,
    age: String,
    dob: String,
    familyMembers: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
