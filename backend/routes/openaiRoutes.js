const express = require('express');
const openaiController = require('../controllers/openaiController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/recipe',authMiddleware , openaiController.getRecipe);

module.exports = router;
