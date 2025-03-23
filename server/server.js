import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import cors from "cors";
import conversionRoutes from "./routes/conversionRoutes.js";
import nomineeRoutes from "./routes/nomineeRoutes.js";
import kycRoutes from "./routes/kycRoutes.js";
import upiPinRoutes from "./routes/upiPinRoutes.js";
import contactRoute from "./routes/contactRoute.js";
import historyRoute from "./routes/historyRoute.js";
import walletRoute from "./routes/walletRoute.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware for CORS
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 200,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to parse JSON
app.use(express.json());

// contact routes
app.use("/newuser", contactRoute);

//user routes
app.use("/api/auth", userRoute);

// currency conversion route
app.use("/api", conversionRoutes);

//nominee detials routes
app.use("/api/nominees", nomineeRoutes);

// kyc Routes
app.use("/api/kyc", kycRoutes);

// upi-pin Routes
app.use("/api/upi-pin", upiPinRoutes);

//wallet Route 
app.use("/api/wallet",walletRoute);

// History Routes
app.use("/history", historyRoute);

// Connect to MongoDB
connectDB();

// Start the server
connectDB().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
