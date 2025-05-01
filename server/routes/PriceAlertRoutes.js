// // routes/priceRoutes.js
// import express from "express";
// import priceAlertController from "../controllers/priceAlertController"
// const router = express.Router();

// // Route to check price alerts
// router.get('/check-alerts', priceAlertController.checkPriceAlerts);

// module.exports = router;



// import express from "express"
// import priceAlertController from "../controllers/priceAlertController.js"
// const router = express.Router();


// // Route to create a new price alert
// router.post('/alerts', priceAlertController.createPriceAlert);

// // Route to get all price alerts
// router.get('/alerts', priceAlertController.getPriceAlerts);

// export default router;




// routes/priceAlertRoutes.js

import express from 'express';
import { createPriceAlert, getPriceAlerts } from '../controllers/priceAlertController.js';

const router = express.Router();

router.post('/alerts', createPriceAlert);
router.get('/alerts', getPriceAlerts);

export default router;
