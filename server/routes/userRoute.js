import express from "express";
import {
  registerUser,
  loginUser,
  verifyOtp,
  resendOtp,
  deleteUserAccount,
  logoutUser,
  resetPassword,
  forgotPasswordInfo,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/deleteAccount", deleteUserAccount);
router.post("/logout", logoutUser);
router.post("/forgot-password", forgotPasswordInfo);
router.post("/reset-password", resetPassword);



export default router;
