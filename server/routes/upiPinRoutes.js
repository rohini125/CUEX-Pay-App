import express from 'express';
import { setUpiPin } from '../controllers/upiPinController.js';

const router = express.Router();

// Route to set UPI PIN
router.post('/set-pin', setUpiPin);

export default router;
