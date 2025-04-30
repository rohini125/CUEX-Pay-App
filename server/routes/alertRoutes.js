// // import express from "express";
// // import Alert from "../models/Alert.js"
// // const router = express.Router();
// // import Notification from "../models/notification.model.js";
// // import axios from "axios";
// // // const Notification = require('../models/notification.model');
// // // const axios = require('axios');



// // // Get all alerts
// // router.get("/", async (req, res) => {
// //   try {
// //     const alerts = await Alert.find();
// //     res.json(alerts);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // Add new alert
// // router.post("/", async (req, res) => {
// //   try {
// //     const { pair, target } = req.body;
// //     const newAlert = new Alert({ pair, target });
// //     await newAlert.save();
// //     res.status(201).json(newAlert);
// //   } catch (err) {
// //     res.status(400).json({ error: err.message });
// //   }
// // });

// // // Delete alert
// // router.delete("/:id", async (req, res) => {
// //   try {
// //     await Alert.findByIdAndDelete(req.params.id);
// //     res.json({ message: "Alert deleted" });
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // Update alert (e.g. mark as triggered)
// // router.patch("/:id", async (req, res) => {
// //   try {
// //     const updatedAlert = await Alert.findByIdAndUpdate(
// //       req.params.id,
// //       req.body,
// //       { new: true }
// //     );
// //     res.json(updatedAlert);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // if (price === alert.target) {
// //   // Send Push Notification
// //   await axios.post('https://exp.host/--/api/v2/push/send', {
// //     to: alert.pushToken,
// //     sound: 'default',
// //     title: 'Price Alert Triggered 📈',
// //     body: `${alert.pair} reached ₹${alert.target}`
// //   });

// //   // Save Notification
// //   await Notification.create({
// //     pushToken: alert.pushToken,
// //     message: `${alert.pair} reached ₹${alert.target}`,
// //     pair: alert.pair
// //   });
// // }

// // export default router







// import express from "express";
// import Alert from "../models/Alert.js";
// const router = express.Router();
// import Notification from "../models/notification.model.js";
// import axios from "axios";

// // Function to get the current price of a currency pair (using a sample API)
// // const getPrice = async (pair) => {
// //   try {
// //     // Replace with your actual API URL and parameters to get the price of the currency pair
// //     const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${pair}`);
// //     return response.data.rates['INR']; // Example for fetching price in INR, adjust based on your API
// //   } catch (error) {
// //     console.error('Error fetching price:', error);
// //     return null; // Handle error and return null if price couldn't be fetched
// //   }
// // };





// const getPrice = async (pair) => {
//   try {
//     // Assuming 'pair' is in the format 'USD-INR'
//     const [baseCurrency, targetCurrency] = pair.split('-');

//     // Check if both base and target currencies are provided
//     if (!baseCurrency || !targetCurrency) {
//       throw new Error('Invalid currency pair');
//     }

//     // Fetch price from API, adjust the URL based on the API's requirement
//     const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
    
//     // Return the rate for the target currency
//     return response.data.rates[targetCurrency];
//   } catch (error) {
//     console.error('Error fetching price:', error);
//     return null; // Handle error and return null if price couldn't be fetched
//   }
// };

// // Get all alerts
// router.get("/", async (req, res) => {
//   try {
//     const alerts = await Alert.find();
//     res.json(alerts);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Add new alert
// router.post("/", async (req, res) => {
//   try {
//     const { pair, target } = req.body;
//     const newAlert = new Alert({ pair, target });
//     await newAlert.save();
//     res.status(201).json(newAlert);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Delete alert
// router.delete("/:id", async (req, res) => {
//   try {
//     await Alert.findByIdAndDelete(req.params.id);
//     res.json({ message: "Alert deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Update alert (e.g. mark as triggered)
// router.patch("/:id", async (req, res) => {
//   try {
//     const updatedAlert = await Alert.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(updatedAlert);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Check if price has reached target and send notification
// const checkPriceAlerts = async () => {
//   try {
//     const alerts = await Alert.find();

//     for (const alert of alerts) {
//       const price = await getPrice(alert.pair); // Fetch the current price for the pair

//       if (price && price >= alert.target) {
//         // Send Push Notification
//         await axios.post('https://exp.host/--/api/v2/push/send', {
//           to: alert.pushToken,
//           sound: 'default',
//           title: 'Price Alert Triggered 📈',
//           body: `${alert.pair} reached ₹${alert.target}`
//         });

//         // Save Notification
//         await Notification.create({
//           pushToken: alert.pushToken,
//           message: `${alert.pair} reached ₹${alert.target}`,
//           pair: alert.pair
//         });

//         // Optionally, update the alert to mark it as triggered
//         await Alert.findByIdAndUpdate(alert._id, { triggered: true });
//       }
//     }
//   } catch (error) {
//     console.error('Error checking price alerts:', error);
//   }
// };

// // Call checkPriceAlerts periodically or trigger it based on your needs
// // For example, you can set an interval to check every minute or hour
// setInterval(checkPriceAlerts, 60000); // Check every minute

// export default router;

import express from "express";
import Alert from "../models/Alert.js"
const router = express.Router();

// Get all alerts
router.get("/", async (req, res) => {
  try {
    const alerts = await Alert.find();
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new alert
router.post("/", async (req, res) => {
  try {
    const { pair, target } = req.body;
    const newAlert = new Alert({ pair, target });
    await newAlert.save();
    res.status(201).json(newAlert);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete alert
router.delete("/:id", async (req, res) => {
  try {
    await Alert.findByIdAndDelete(req.params.id);
    res.json({ message: "Alert deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update alert (e.g. mark as triggered)
router.patch("/:id", async (req, res) => {
  try {
    const updatedAlert = await Alert.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedAlert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
