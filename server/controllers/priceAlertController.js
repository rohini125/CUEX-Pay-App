// import Notification from "../models/notification";
// import PriceAlert from "../models/PriceAlert";

// const fetchCurrentRate = async (currency) => {
//   // Replace this with your actual logic to get live exchange rates
//   return 82.3;
// };

// const checkPriceAlerts = async () => {
//   const alerts = await PriceAlert.find();

//   for (const alert of alerts) {
//     const currentRate = await fetchCurrentRate(alert.currency);

//     const shouldNotify =
//       (alert.mode === 'above' && currentRate >= alert.target) ||
//       (alert.mode === 'below' && currentRate <= alert.target);

//     if (shouldNotify) {
//       const message = `📈 ${alert.currency} has ${
//         alert.mode === 'above' ? 'risen above' : 'fallen below'
//       } ${alert.target}`;

//       await Notification.create({ message });

//       // Optionally disable/delete the alert after triggering
//     }
//   }
// };

// module.exports = { checkPriceAlerts };




import PriceAlert from '../models/PriceAlert.js';
// Create a new price alert
export const createPriceAlert = async (req, res) => {
  try {
    const { currency, targetPrice, alertType } = req.body;
    const newAlert = new PriceAlert({ currency, targetPrice, alertType });
    await newAlert.save();
    res.status(201).json(newAlert);
  } catch (error) {
    res.status(500).json({ message: 'Error creating price alert', error });
  }
};

// Get all price alerts
export const getPriceAlerts = async (req, res) => {
  try {
    const alerts = await PriceAlert.find();
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving price alerts', error });
  }
};

