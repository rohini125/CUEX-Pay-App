const express = require('express');
const router = express.Router();
const { createProfile } = require('../controllers/profileController');
const upload = require('../middlewares/upload');

router.post('/P', upload.single('profileImage'), createProfile);

module.exports = router;
