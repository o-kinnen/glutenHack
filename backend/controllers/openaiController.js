const axios = require('axios');
const userModel = require('../models/userModel');
const recipeModel = require('../models/recipeModel');
const path = require('path');
const fs = require('fs');
const db = require('../utils/db');

const getRecipe = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Accès non autorisé. Aucun jeton fourni.' });
    }
    const result = await db.query('SELECT user_id FROM tokens WHERE token = $1 AND expires_at > NOW()', [token]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Jeton invalide ou expiré.' });
    }
    const userId = result.rows[0].user_id;
    const { time, difficulty, cuisine, people, type, availableIngredients } = req.body;
    let restrictionsList = await userModel.getRestrictionsByUserId(userId);
    if (restrictionsList.length == 0 ){
      restrictionsList = ["Pas de mention"]
    }
    let content = `Donne-moi une recette en français ayant aucune trace des éléments suivants : ${restrictionsList} dans les ingrédients et qui répond au critère suivants :
    Temps de préparation : ${time}. Difficulté : ${difficulty}. Cuisine : ${cuisine}. Nombre de personnes : ${people}. Type de repas : ${type}.`;
    if (availableIngredients && availableIngredients.length > 0) {
      const stockIngredients = availableIngredients
      .map(ingredient => `${ingredient.food_name} (${ingredient.selectedQuantity} ${ingredient.unit || ''})`)
      .join(', ');
      content += ` Parmis les ingrédients inclus les suivants : ${stockIngredients}.`;
    }
    content += ` Le format de la réponse doit être en JSON valide avec les clés suivantes :
    "restrictionsList" dont la valeur est égale à une liste contenant les éléments suivants ${restrictionsList},
    "title", "ingredients", "quantity" et "instructions". La clé "ingredients" doit être une liste d'ingrédients dont les noms des aliments doivent être
    au singulier en minuscule, la clé "quantity" est la quantité pour chaque ingrédient et la clé "instructions" doit être une liste d'étapes.`;
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content,
          },
        ],
        max_tokens: 500,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    if (response.data && response.data.choices && response.data.choices.length > 0) {
      const recipeData = JSON.parse(response.data.choices[0].message.content);
      if (recipeData && recipeData.title && recipeData.ingredients && recipeData.instructions) {
        const imageUrl = await generateRecipeImage(recipeData.title);
        recipeData.image = imageUrl;
        return res.status(200).json({
          title: recipeData.title,
          ingredients: recipeData.ingredients,
          instructions: recipeData.instructions,
          quantity: recipeData.quantity,
          time: time,
          difficulty: difficulty,
          cuisine: cuisine,
          people: people,
          type: type,
          image: recipeData.image,
          restrictionsList: recipeData.restrictionsList,
          created_by_ai: true,
        });
      } else {
        return res.status(500).json({ error: 'Les données de la recette sont manquantes ou mal formatées.' });
      }
    } else {
      return res.status(500).json({ error: 'Aucune recette retournée par l\'API OpenAI.' });
    }
  } catch (error) {
    console.error('Erreur lors de l\'appel à OpenAI :', error);
    return res.status(500).json({ error: 'Erreur lors de la recherche de la recette.' });
  }
};

const generateRecipeImage = async (recipeTitle) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt: `Une belle image du plat ${recipeTitle}`,
        n: 1,
        size: '1024x1024',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    if (response.data && response.data.data && response.data.data.length > 0) {
      const imageUrl = response.data.data[0].url;
      const imageResponse = await axios.get(imageUrl, { responseType: 'stream' });
      const imageFileName = `${Date.now()}-${recipeTitle.replace(/ /g, '_')}.png`;
      const imagePath = path.join(__dirname, '..', 'uploads', imageFileName);
      const writer = fs.createWriteStream(imagePath);
      imageResponse.data.pipe(writer);
      return new Promise((resolve, reject) => {
        writer.on('finish', () => {
          const fullUrl = `${process.env.URL_BACKEND}/uploads/${imageFileName}`;
          resolve(fullUrl);
        });
        writer.on('error', reject);
      });
    } else {
      throw new Error('Erreur lors de la génération de l\'image : aucune donnée renvoyée.');
    }
  } catch (error) {
    console.error('Erreur lors de la génération de l\'image :', error);
    throw error;
  }
};

const saveRecipe = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Accès non autorisé. Aucun jeton fourni.' });
    }
    const result = await db.query('SELECT user_id FROM tokens WHERE token = $1 AND expires_at > NOW()', [token]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Jeton invalide ou expiré.' });
    }
    const userId = result.rows[0].user_id;
    const isGeneratedByAI = req.body.recipe ? req.body.recipe.created_by_ai : req.body.created_by_ai === 'true';
    const recipe = isGeneratedByAI ? req.body.recipe : req.body;
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
      instructions,
      quantity,
    } = recipe;
    let parsedIngredients = [];
    let parsedInstructions = [];
    let parsedRestrictions = [];
    if (!isGeneratedByAI) {
      try {
        parsedIngredients = JSON.parse(ingredients);
        parsedInstructions = JSON.parse(instructions);
        parsedRestrictions = JSON.parse(restrictionsList);
      } catch (err) {
        console.error('Erreur de parsing des valeurs JSON :', err);
        return res.status(400).json({ error: 'Erreur de parsing des valeurs JSON' });
      }
    } else {
      parsedIngredients = ingredients.map((ingredient, index) => ({
        food_name: ingredient,
        quantity: quantity[index] || 'N/A',
      }));
      parsedInstructions = instructions;
      parsedRestrictions = restrictionsList || [];
    }
    if (!title || !time || !difficulty || !people || !cuisine || !type || parsedIngredients.length === 0 || parsedInstructions.length === 0) {
      return res.status(400).json({ error: 'Tous les champs obligatoires doivent être remplis.' });
    }
    const isRecipePublic = isPublic === true || isPublic === 'true';
    const instructionsString = parsedInstructions.map((inst) => inst.step ? inst.step : inst).join('\n');
    const imageUrl = req.file
      ? `${process.env.URL_BACKEND}/uploads/${req.file.filename}`
      : recipe.image || null;
    const recipeData = {
      recipe_name: title,
      instructions: instructionsString,
      preparation_time: time,
      difficulty: difficulty,
      cuisine_type: cuisine,
      number_of_person: parseInt(people),
      category_type: type,
      allergens_list: parsedRestrictions,
      ingredients: parsedIngredients,
      user_id: userId,
      created_by_ai: isGeneratedByAI,
      public: isRecipePublic,
      image_url: imageUrl,
    };
    const recipeId = await recipeModel.saveRecipe(recipeData);
    return res.status(201).json({ message: 'Recette enregistrée avec succès', recipeId });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la recette :', error);
    return res.status(500).json({ error: 'Erreur lors de l\'enregistrement de la recette.' });
  }
};

module.exports = {
  getRecipe,
  saveRecipe,
};
