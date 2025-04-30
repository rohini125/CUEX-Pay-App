// import express from "express"
// const router = express.Router();
// const Notification = require('../models/notification.model');

// router.get('/:pushToken', async (req, res) => {
//   try {
//     const notifications = await Notification.find({ pushToken: req.params.pushToken }).sort({ triggeredAt: -1 });
//     res.json(notifications);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch notifications' });
//   }
// });

// module.exports = router;
