import express from "express";
import mongoose from 'mongoose';
import userRoute from "./routes/userRoute.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import cors from "cors";
import conversionRoutes from "./routes/conversionRoutes.js";
import nomineeRoutes from "./routes/nomineeRoutes.js";
import kycRoutes from "./routes/kycRoutes.js";
import upiPinRoutes from "./routes/upiPinRoutes.js";
import contactRoute from "./routes/contactRoute.js";
import accountRoutes from "./routes/accountRoutes.js";
import historyRoute from "./routes/historyRoute.js";
import walletRoute from "./routes/walletRoute.js";
import transferRoute from "./routes/transferRoutes.js";
import alertRoutes from "./routes/alert.js"
import alertRoutes from "./routes/alertRoutes.js";
// import notificationRoutes from "./routes/notificationsRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();


const app = express(); // Initialize the express app

app.use(cors());

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
// app.use("/api/kyc", kycRoutes);

// upi-pin Routes
app.use("/api/upi-pin", upiPinRoutes);

//wallet Route
app.use("/api/wallet", walletRoute);

// History Routes
app.use("/history", historyRoute);

//account Routes
app.use("/api", accountRoutes);

// Routes
app.use("/bank", transferRoute);

//Alert
app.use("/alerts", alertRoutes);

//Notification
// app.use('/notifications', notificationRoutes);


// Connect to MongoDB
connectDB();
const PORT = 7000;
// Start the server
connectDB().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
