const express = require('express');
const { addNominee } = require('../controllers/nomineeController');

const router = express.Router();

router.post('/N', addNominee);

module.exports = router;
