import express from "express";
import { convertCurrency, getHistory, clearHistory } from "../controllers/conversionController.js";

const router = express.Router();

// Convert currency
router.post("/convert", convertCurrency);

// Get conversion history
router.get("/history", getHistory);

// Clear history
router.delete("/history", clearHistory);

export default router;
