// import express from 'express';
// import { handleOTPRequest } from '../controllers/kycController.js'; 

// const router = express.Router();

// // Route to send OTP
// router.post('/send-otp', handleOTPRequest);

// // Route to verify OTP
// // router.post('/verify-otp', verifyOtpController);

// export default router;


import express from 'express';
import { verifyMobileAndSendOTP, verifyOTP } from '../controllers/kycController.js';

const router = express.Router();

// Routes for KYC verification
router.post('/send-otp', verifyMobileAndSendOTP);
router.post('/verify-otp', verifyOTP);

export default router;
