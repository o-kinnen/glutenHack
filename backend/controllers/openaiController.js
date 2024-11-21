const axios = require('axios');
const userModel = require('../models/userModel');
const recipeModel = require('../models/recipeModel');

const getRecipe = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { time, difficulty, cuisine, people, type, availableIngredients } = req.body;

    const restrictionsList = await userModel.getRestrictionsByUserId(userId);

    let content = `Donne-moi une recette ayant aucune trace des éléments suivants : ${restrictionsList} dans les ingrédients et qui répond au critère suivants :
    Temps de préparation : ${time}. Difficulté : ${difficulty}. Cuisine : ${cuisine}. Nombre de personnes : ${people}. Type de repas : ${type}.`;

    if (availableIngredients && availableIngredients.length > 0) {
      const stockIngredients = availableIngredients.join(', ');
      content += ` Que les ingrédients suivants soit obligatoirement utilisés si mes restrictions le permettent : ${stockIngredients}.`;
    }

    content += ` Le format de la réponse doit être en JSON valide avec les clés suivantes :
    "restrictionsList" dont la valeur est égale à une liste contenant les éléments suivants ${restrictionsList},
    la variable "image" qui doit être une photo de la recette que tu vas générer,
    "title", "ingredients", "quantity" et "instructions". La clé "ingredients" doit être une liste d'ingrédients (les aliments) 
    au singulier en minuscules, la clé "quantity" est la quantité pour chaque ingrédient et la clé "instructions" doit être une liste d'étapes.`;

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

    if (response.data && response.data.choices && response.data.choices.length > 0) {
      try {
        const recipeData = JSON.parse(response.data.choices[0].message.content);
        
        if (recipeData && recipeData.title && recipeData.ingredients && recipeData.instructions) {
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
            restrictionsList: recipeData.restrictionsList
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

const saveRecipe = async (req, res) => {
  try {
    const { recipe} = req.body;

    if (!recipe || !recipe.ingredients || recipe.ingredients.length === 0) {
      return res.status(400).json({ error: 'La recette doit contenir des ingrédients.' });
    }

    const ingredients = recipe.ingredients.map((ingredient, index) => ({
      name: ingredient,
      quantity: recipe.quantity[index] || 'N/A'
    }));

    const recipeData = {
      recipe_name: recipe.title,
      instructions: recipe.instructions.join('\n'),
      preparation_time: recipe.time,
      difficulty: recipe.difficulty,
      cuisine_type: recipe.cuisine,
      number_of_person: recipe.people,
      category_type: recipe.type,
      allergens_list: recipe.restrictionsList || [],
      ingredients,
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
