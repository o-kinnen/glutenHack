const axios = require('axios');

const getRecipe = async (req, res) => {
  try {
    const content = `Donne-moi une recette ayant aucune trace de gluten. 
    Le format de la réponse doit être en JSON valide avec les clés suivantes :
     "title", "ingredients", "instructions". La clé "ingredients" doit être une liste d'ingrédients, 
     et la clé "instructions" doit être une liste d'étapes.`;

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

    const recipeData = JSON.parse(response.data.choices[0]?.message?.content);

    res.status(200).json({
      title: recipeData.title,
      ingredients: recipeData.ingredients,
      instructions: recipeData.instructions,
    });
  } catch (error) {
    console.error('Erreur lors de l\'appel à OpenAI :', error);
    res.status(500).json({ error: 'Erreur lors de la recherche de la recette' });
  }
};

module.exports = {
  getRecipe,
};
