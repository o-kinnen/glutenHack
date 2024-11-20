const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const openaiController = require('../controllers/openaiController');
const authMiddleware = require('../middlewares/auth');

router.post('/save', authMiddleware, openaiController.saveRecipe);
router.get('/all', authMiddleware, recipeController.getAllRecipes);

module.exports = router;
