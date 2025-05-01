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
import express from "express";
import Notification from "../models/Notification.js";
const router = express.Router();


// GET all notifications
router.get('/', async (req, res) => {
  const notifications = await Notification.find();
  res.json(notifications);
});

// POST a new notification
router.post('/', async (req, res) => {
  const { message } = req.body;
  const newNotification = new Notification({ message });
  await newNotification.save();
  res.status(201).json(newNotification);
});

// DELETE all notifications
router.delete('/', async (req, res) => {
  await Notification.deleteMany();
  res.status(204).send();
});
export default router;