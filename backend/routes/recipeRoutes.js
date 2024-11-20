const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const openaiController = require('../controllers/openaiController');

router.post('/save', openaiController.saveRecipe);
router.get('/all', recipeController.getAllRecipes);

module.exports = router;
