import express from "express";
import {
  registerUser,
  loginUser,
  verifyOtp,
  deleteUserAccount,
  logoutUser,
  resetPassword,
  requestPasswordReset,
} from "../controllers/userController.js";
// import { registerUser, loginUser, verifyOtp } from '../controllers/authController.js';

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOtp);
router.post("/deleteAccount", deleteUserAccount);
router.post("/logout", logoutUser);
router.get("/reset-password", resetPassword);
router.post("/request-password-reset", requestPasswordReset);

export default router;
