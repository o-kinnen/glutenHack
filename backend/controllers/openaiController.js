const axios = require('axios');
const userModel = require('../models/userModel');

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
    "title", "ingredients", "instructions". La clé "ingredients" doit être une liste d'ingrédients, 
    et la clé "instructions" doit être une liste d'étapes.`;

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
            time,
            difficulty,
            cuisine,
            people,
            type
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

module.exports = {
  getRecipe,
};
