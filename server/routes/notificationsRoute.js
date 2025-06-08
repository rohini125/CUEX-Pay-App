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

// // module.exports = router;
// import express from "express";
// import Notification from "../models/Notification.js";
// const router = express.Router();


// // GET all notifications
// router.get('/', async (req, res) => {
//   const notifications = await Notification.find();
//   res.json(notifications);
// });

// // POST a new notification
// router.post('/', async (req, res) => {
//   const { message } = req.body;
//   const newNotification = new Notification({ message });
//   await newNotification.save();
//   res.status(201).json(newNotification);
// });

// // DELETE all notifications
// router.delete('/', async (req, res) => {
//   await Notification.deleteMany();
//   res.status(204).send();
// });
// export default router;


// import express from "express";
// import Notification from "../models/Notification.js";
// const router = express.Router();

// // Get all
// router.get('/', async (req, res) => {
//   const notifications = await Notification.find().sort({ timestamp: -1 });
//   res.json(notifications);
// });

// // Add one
// router.post('/', async (req, res) => {
//   const { message } = req.body;
//   const newNotification = new Notification({ message });
//   await newNotification.save();
//   res.status(201).json(newNotification);
// });

// // Delete one
// router.delete('/:id', async (req, res) => {
//   await Notification.findByIdAndDelete(req.params.id);
//   res.status(204).send();
// });

// export default router;







// // const express = require('express');
// // const router = express.Router();
// // const Notification = require('../models/Notification');

// import express from "express";
// import Notification from "../models/Notification.js";
// const router = express.Router();

// // Get all notifications
// router.get('/notification', async (req, res) => {
//   const notifications = await Notification.find().sort({ createdAt: -1 });
//   res.json(notifications);
// });

// // Get unread notification count
// router.get('/notification/unread/count', async (req, res) => {
//   const count = await Notification.countDocuments({ read: false });
//   res.json({ count });
// });

// // Mark all as read
// router.put('/notification/mark-all-read', async (req, res) => {
//   await Notification.updateMany({ read: false }, { $set: { read: true } });
//   res.json({ success: true });
// });
// export default router;



// import express from 'express';
// import Notification from '../models/Notification.js';

// const router = express.Router();



// // POST /notifications
// router.post('/notifications', async (req, res) => {
//   const { message } = req.body;
//   const newNotification = new Notification({ message });
//   await newNotification.save();
//   res.status(201).json(newNotification);
// });

// // GET /notifications
// router.get('/notifications', async (req, res) => {
//   const notifications = await Notification.find().sort({ _id: -1 });
//   res.json(notifications);
// });

// // // Get all notifications
// // router.get('/', async (req, res) => {
// //   try {
// //     const notifications = await Notification.find().sort({ createdAt: -1 });
// //     res.json(notifications);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // Add a notification (for testing)
// // router.post('/', async (req, res) => {
// //   try {
// //     const { message } = req.body;
// //     const newNotification = new Notification({ message });
// //     await newNotification.save();
// //     res.status(201).json(newNotification);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // Delete notification by id
// router.delete('/:id', async (req, res) => {
//   try {
//     await Notification.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Notification deleted' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Mark all notifications as read
// // PUT /notifications/mark-all-read
// router.put('/notifications/mark-all-read', async (req, res) => {
//   try {
//     await Notification.updateMany({ read: false }, { $set: { read: true } });
//     res.json({ message: 'All marked as read' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error marking as read' });
//   }
// });

// export default router;






// import express from 'express';
// import Notification from '../models/Notification.js';

// const router = express.Router();

// // GET all notifications
// router.get('/', async (req, res) => {
//   const notifications = await Notification.find().sort({ createdAt: -1 });
//   res.json(notifications);
// });

// // Express route
// router.get('/notifications/unread-count', async (req, res) => {
//   try {
//     const count = await Notification.countDocuments({ read: false });
//     res.json({ count });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // POST new notification
// router.post('/', async (req, res) => {
//   const { message } = req.body;
//   const notification = new Notification({ message });
//   await notification.save();
//   res.status(201).json(notification);
// });

// // DELETE notification
// router.delete('/:id', async (req, res) => {
//   await Notification.findByIdAndDelete(req.params.id);
//   res.status(204).end();
// });

// // Mark all as read
// router.patch('/mark-all-read', async (req, res) => {
//   await Notification.updateMany({ read: false }, { $set: { read: true } });
//   res.json({ success: true });
// });

// export default router;






import express from 'express';
import Notification from '../models/Notification.js';

const router = express.Router();

// GET all notifications
router.get('/', async (req, res) => {
  const notifications = await Notification.find().sort({ createdAt: -1 });
  res.json(notifications);
});

// ✅ Fixed: Unread count
router.get('/unread-count', async (req, res) => {
  try {
    const count = await Notification.countDocuments({ read: false });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new notification
router.post('/', async (req, res) => {
  const { message } = req.body;
  const notification = new Notification({ message });
  await notification.save();
  res.status(201).json(notification);
});

// DELETE notification
router.delete('/:id', async (req, res) => {
  await Notification.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

// Mark all as read
router.patch('/mark-all-read', async (req, res) => {
  await Notification.updateMany({ read: false }, { $set: { read: true } });
  res.json({ success: true });
});

export default router;
