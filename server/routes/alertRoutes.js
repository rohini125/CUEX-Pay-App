const express = require("express");
const Alert = require("../models/Alert");
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

module.exports = router;