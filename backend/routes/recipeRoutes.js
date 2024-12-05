const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const openaiController = require('../controllers/openaiController');
const authMiddleware = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.post('/save', authMiddleware, upload.single('image'), openaiController.saveRecipe);
router.get('/all', authMiddleware, recipeController.getAllRecipes);
router.get('/user', authMiddleware, recipeController.getRecipesByUserId);

module.exports = router;
