const { getAllRecipes } = require('../models/recipeModel');

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

