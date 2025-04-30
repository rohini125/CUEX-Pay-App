import express from 'express';
import { setUpiPin, resetUpiPin } from '../controllers/upiPinController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/set-upi-pin', protect, setUpiPin);
router.post('/reset-upi-pin', protect, resetUpiPin);

export default router;
