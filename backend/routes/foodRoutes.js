const express = require('express');
const { verifierAliment } = require('../controllers/foodController');

const router = express.Router();

router.get('/food', verifierAliment);

module.exports = router;
