import express from "express";
import {
  getBalance,
  depositBalance,
} from "../controllers/balanceController.js";

const router = express.Router();

router.get("/getbalance", getBalance);
router.post("/depositeBalance", depositBalance);

export default router;
