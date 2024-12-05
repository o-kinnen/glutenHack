const axios = require('axios');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const recipeModel = require('../models/recipeModel');

const getRecipe = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { time, difficulty, cuisine, people, type, availableIngredients } = req.body;

    const restrictionsList = await userModel.getRestrictionsByUserId(userId);

    let content = `Donne-moi une recette en français ayant aucune trace des éléments suivants : ${restrictionsList} dans les ingrédients et qui répond au critère suivants :
    Temps de préparation : ${time}. Difficulté : ${difficulty}. Cuisine : ${cuisine}. Nombre de personnes : ${people}. Type de repas : ${type}.`;

    if (availableIngredients && availableIngredients.length > 0) {
      const stockIngredients = availableIngredients
        .map(ingredient => `${ingredient.food_name} (${ingredient.quantity})`)
        .join(', ');
      content += ` Il faut qu'un maximum des ingrédients suivants soient utilisés : ${stockIngredients}.`;
    }

    content += ` Le format de la réponse doit être en JSON valide avec les clés suivantes :
    "restrictionsList" dont la valeur est égale à une liste contenant les éléments suivants ${restrictionsList},
    "title", "ingredients", "quantity" et "instructions". La clé "ingredients" doit être une liste d'ingrédients dont les noms des aliments doivent être
    au singulier en minuscule, la clé "quantity" est la quantité pour chaque ingrédient et la clé "instructions" doit être une liste d'étapes.`;

    console.log(content);

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

    console.log('Réponse API OpenAI:', JSON.stringify(response.data, null, 2));


    if (response.data && response.data.choices && response.data.choices.length > 0) {
      try {
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
            created_by_ai: true
          });
        } else {
          return res.status(500).json({ error: 'Les données de la recette sont manquantes ou mal formatées.' });
        }
      } catch (error) {
        console.error('Erreur lors du parsing du contenu de la réponse :', error);
        return res.status(500).json({ error: 'Erreur lors du traitement de la recette retournée.' });
      }
    } else {
      return res.status(500).json({ error: 'Aucune recette retournée par l\'API OpenAI.' });
    }
  } catch (error) {
    console.error('Erreur lors de l\'appel à OpenAI :', error);
    return res.status(500).json({ error: 'Erreur lors de la recherche de la recette' });
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
      console.log('URL de l\'image générée:', response.data.data[0].url);
      return response.data.data[0].url;
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
      return res.status(401).json({ message: 'Accès non autorisé. Aucun token fourni.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.user_id);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const isGeneratedByAI = req.body.recipe ? req.body.recipe.created_by_ai : req.body.created_by_ai === 'true';

    let recipe;
    if (isGeneratedByAI) {
      recipe = req.body.recipe;
    } else {
      recipe = req.body;
    }

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
        name: ingredient,
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
      user_id: user.user_id,
      created_by_ai: isGeneratedByAI,
      public: isRecipePublic,
      image_url: req.file ? req.file.path : recipe.image || null
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
  saveRecipe
};
