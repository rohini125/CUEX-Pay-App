import express from "express";
import { getWallet, depositMoney, withdrawMoney } from "../controllers/walletController.js";

const router = express.Router();

router.get("/currencies", getWallet);
router.post("/deposit", depositMoney);
router.post("/withdraw", withdrawMoney);

export default router;
