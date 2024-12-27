const { getAllRecipes } = require('../models/recipeModel');
const { getRecipesByUserId } = require('../models/recipeModel');
const { deleteRecipeById } = require('../models/recipeModel');

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await getAllRecipes();
    if (recipes.length === 0) {
      return res.status(404).json({ message: 'Aucune recette trouvée.' });
    }
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Erreur lors de la récupération des recettes :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des recettes.' });
  }
};

exports.getRecipesByUserId = async (req, res, next) => {
  const userId = req.user.user_id;
  try {
    const recipes = await getRecipesByUserId(userId);
    if (recipes.length === 0) {
      return res.status(404).json({ message: 'Aucune recette trouvée.' });
    }
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Erreur lors de la récupération des recettes :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des recettes.' });
  }
};

exports.deleteRecipe = async (req, res) => {
  const { recipeId } = req.params;
  const userId = req.user.user_id;
  try {
    const success = await deleteRecipeById(recipeId, userId);
    if (!success) {
      return res.status(404).json({ message: 'Recette non trouvée ou non autorisée.' });
    }
    res.status(200).json({ message: 'Recette supprimée avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la recette :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la suppression de la recette.' });
  }
};
