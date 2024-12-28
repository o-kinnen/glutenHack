const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const openaiController = require('../controllers/openaiController');
const authMiddleware = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.post('/save', authMiddleware, upload.single('image'), openaiController.saveRecipe);
router.get('/all', authMiddleware, recipeController.getAllRecipes);
router.get('/user', authMiddleware, recipeController.getRecipesByUserId);
router.delete('/:recipeId', authMiddleware, recipeController.deleteRecipe);
router.put('/update/:recipeId',authMiddleware, upload.single('image'), recipeController.updateRecipe);
router.post('/favorites/add', authMiddleware, recipeController.addToFavorites);
router.delete('/favorites/remove/:recipeId', authMiddleware, recipeController.removeFromFavorites);
router.get('/favorites/check/:recipeId', authMiddleware, recipeController.checkFavorite);
router.get('/favorites', authMiddleware, recipeController.getFavorites);



module.exports = router;
