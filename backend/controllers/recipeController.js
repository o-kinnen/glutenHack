const { getAllRecipes } = require('../models/recipeModel');
const { getRecipesByUserId } = require('../models/recipeModel');
const { deleteRecipeById } = require('../models/recipeModel');
const { updateRecipe } = require('../models/recipeModel');
const favoritesModel = require('../models/recipeModel');
const recipeModel = require('../models/recipeModel');
const path = require('path');
const fs = require('fs');


exports.getAllRecipes = async (req, res) => {
  const userId = req.user.user_id;
  try {
    const recipes = await getAllRecipes(userId);
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

exports.updateRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const userId = req.user.user_id;

    const {
      title,
      time,
      difficulty,
      people,
      cuisine,
      type,
      public: isPublic,
      restrictionsList,
      ingredients,
      instructions
    } = req.body;

    let parsedIngredients = [];
    let parsedRestrictions = [];
    let parsedInstructions = [];

    try {
      parsedIngredients = JSON.parse(ingredients);
      parsedRestrictions = JSON.parse(restrictionsList);

      const rawInstructions = JSON.parse(instructions);
      if (Array.isArray(rawInstructions)) {
        parsedInstructions = rawInstructions.map((inst) => inst.step);
      } else {
        throw new Error('Les instructions ne sont pas un tableau valide.');
      }
    } catch (error) {
      console.error('Erreur de parsing des champs JSON :', error);
      return res.status(400).json({ error: 'Erreur de parsing des champs JSON.' });
    }

    const imageUrl = req.file
      ? `${process.env.URL_BACKEND}/uploads/${req.file.filename}`
      : null;

     const existingRecipe = await getRecipesByUserId(userId);

    if (!existingRecipe) {
      return res.status(404).json({ error: 'Recette non trouvée.' });
    }
    const recipeToUpdate = existingRecipe.find(recipe => recipe.recipe_id === parseInt(recipeId));

    if (!recipeToUpdate) {
      return res.status(404).json({ error: 'Recette non trouvée.' });
    }
    
    if (imageUrl && recipeToUpdate.image_url) {
      const oldImagePath = path.join(__dirname, '../uploads', path.basename(recipeToUpdate.image_url));

      if (fs.existsSync(oldImagePath)) {
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error(`Erreur lors de la suppression de l'ancienne image : ${err.message}`);
          }
        });
      } else {
        console.warn('Le fichier de l\'ancienne image n\'existe pas :', oldImagePath);
      }
    }

    const formattedInstructions = parsedInstructions.join('\n');

    const updatedRecipeData = {
      recipe_id: recipeId,
      recipe_name: title,
      preparation_time: time,
      difficulty,
      number_of_person: people,
      cuisine_type: cuisine,
      category_type: type,
      public: isPublic,
      allergens_list: parsedRestrictions,
      instructions: formattedInstructions,
      ingredients: parsedIngredients,
      image_url: imageUrl || existingRecipe.image_url,
    };

    await updateRecipe(updatedRecipeData);

    res.status(200).json({ 
      message: 'Recette mise à jour avec succès.', 
      updatedRecipe: { 
        ...updatedRecipeData,
        image_url: updatedRecipeData.image_url || existingRecipe.image_url
      } 
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la recette :', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la recette.' });
  }
};

exports.addToFavorites = async (req, res) => {
  const { recipeId } = req.body;
  const userId = req.user.user_id;

  if (!userId || !recipeId) {
    return res.status(400).json({ message: 'Données invalides : userId ou recipeId manquant.' });
  }

  try {
    const isAlreadyFavorite = await favoritesModel.isFavorite(userId, recipeId);
    if (isAlreadyFavorite) {
      return res.status(409).json({ message: 'Cette recette est déjà dans vos favoris.' });
    }

    await favoritesModel.addFavorite(userId, recipeId);
    res.status(200).json({ message: 'Recette ajoutée aux favoris avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l\'ajout aux favoris :', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.removeFromFavorites = async (req, res) => {
  const { recipeId } = req.params;
  const userId = req.user.user_id;

  if (!userId || !recipeId) {
    return res.status(400).json({ message: 'Données invalides : userId ou recipeId manquant.' });
  }

  try {
    const isFavorite = await favoritesModel.isFavorite(userId, recipeId);
    if (!isFavorite) {
      return res.status(404).json({ message: 'Cette recette n\'est pas dans vos favoris.' });
    }

    await favoritesModel.removeFavorite(userId, recipeId);
    res.status(200).json({ message: 'Recette retirée des favoris avec succès.' });
  } catch (error) {
    console.error('Erreur lors du retrait des favoris :', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.checkFavorite = async (req, res) => {
  const { recipeId } = req.params
  const userId = req.user.user_id;

  if (!userId || !recipeId) {
    return res.status(400).json({ message: 'Données invalides.' });
  }

  try {
    const isFavorite = await favoritesModel.isFavorite(userId, recipeId);
    res.status(200).json({ isFavorite });
  } catch (error) {
    console.error('Erreur lors de la vérification des favoris :', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.getFavorites = async (req, res) => {
  const userId = req.user.user_id;

  if (!userId) {
    return res.status(400).json({ message: 'Utilisateur non authentifié.' });
  }

  try {
    const favorites = await favoritesModel.getFavoritesByUserId(userId);
    res.status(200).json(favorites);
  } catch (error) {
    console.error('Erreur lors de la récupération des favoris :', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.addOrUpdateRate = async (req, res) => {
  const { recipeId, rating } = req.body;
  const userId = req.user.user_id;

  if (!userId || !recipeId || !rating) {
    return res.status(400).json({ message: 'Données manquantes : userId, recipeId ou rating.' });
  }

  try {
    await recipeModel.upsertRate(userId, recipeId, rating);
    res.status(200).json({ message: 'Note enregistrée ou mise à jour avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement ou de la mise à jour de la note :', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.getAverageRating = async (req, res) => {
  const { recipeId } = req.params;

  if (!recipeId) {
    return res.status(400).json({ message: 'Le champ recipeId est requis.' });
  }

  try {
    const averageRating = await recipeModel.getAverageRating(recipeId);
    res.status(200).json({ averageRating });
  } catch (error) {
    console.error('Erreur lors de la récupération de la moyenne des notes :', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.getRateByRecipe = async (req, res) => {
  const { recipeId } = req.params;

  if (!recipeId) {
    return res.status(400).json({ message: 'Le champ recipeId est requis.' });
  }

  try {
    const reviews = await recipeModel.getRateByRecipe(recipeId);
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Erreur lors de la récupération des notes :', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};