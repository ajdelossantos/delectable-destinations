const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

// Do work here
// req has the info; res has methods for sending data back
router.get('/', storeController.homePage);

module.exports = router;
