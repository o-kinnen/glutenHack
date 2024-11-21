const db = require('../utils/db');

const getOrCreateFoodId = async (foodName) => {
    const client = await db.connect();
    try {
      const selectQuery = `SELECT food_id FROM foods WHERE food_name = $1;`;
      const selectResult = await client.query(selectQuery, [foodName]);
  
      if (selectResult.rows.length > 0) {
        return selectResult.rows[0].food_id;
      }

      const insertQuery = `INSERT INTO foods (food_name) VALUES ($1) RETURNING food_id;`;
      const insertResult = await client.query(insertQuery, [foodName]);
      return insertResult.rows[0].food_id;
    } catch (error) {
      console.error('Erreur lors de l\'ajout ou de la récupération du food_id :', error);
      throw error;
    } finally {
      client.release();
    }
  };
  
const saveRecipe = async (recipeData) => {
    const {
      recipe_name,
      instructions,
      preparation_time,
      difficulty,
      cuisine_type,
      number_of_person,
      category_type,
      allergens_list,
      ingredients,
    } = recipeData;
  
    const client = await db.connect();
    try {
      await client.query('BEGIN');
  
      const recipeQuery = `
        INSERT INTO recipes (recipe_name, instructions, preparation_time, difficulty, cuisine_type, number_of_person, category_type, allergens_list)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING recipe_id;
      `;
      const recipeValues = [
        recipe_name,
        instructions,
        preparation_time,
        difficulty,
        cuisine_type,
        number_of_person,
        category_type,
        allergens_list
      ];
      const recipeResult = await client.query(recipeQuery, recipeValues);
      const recipeId = recipeResult.rows[0].recipe_id;
  
      for (const ingredient of ingredients) {
        const foodId = await getOrCreateFoodId(ingredient.name);
  
        const ingredientQuery = `
          INSERT INTO recipes_ingredients (recipe_id, food_id, quantity)
          VALUES ($1, $2, $3);
        `;
        const ingredientValues = [recipeId, foodId, ingredient.quantity || 'N/A'];
        await client.query(ingredientQuery, ingredientValues);
      }
  
      await client.query('COMMIT');
      return recipeId;
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Erreur lors de l\'enregistrement de la recette :', error);
      throw error;
    } finally {
      client.release();
    }
  };
  

const getAllRecipes = async () => {
  const client = await db.connect();
  try {
    const query = `
      SELECT
        r.recipe_id,
        r.recipe_name,
        r.instructions,
        r.preparation_time,
        r.difficulty,
        r.cuisine_type,
        r.number_of_person,
        r.category_type,
        r.created_at,
        r.allergens_list,
        json_agg(
          json_build_object(
            'food_id', ri.food_id,
            'food_name', f.food_name,
            'quantity', ri.quantity
          )
        ) AS ingredients
      FROM recipes r
      LEFT JOIN recipes_ingredients ri ON r.recipe_id = ri.recipe_id
      LEFT JOIN foods f ON ri.food_id = f.food_id
      GROUP BY r.recipe_id
      ORDER BY r.created_at DESC;
    `;
  
    const result = await client.query(query);
  
    if (result.rows.length === 0) {
      return [];
    }
  
    return result.rows;
  } catch (error) {
    console.error('Erreur lors de la récupération des recettes :', error);
    throw error;
  } finally {
    client.release();
  }
};
  
module.exports = {
  saveRecipe,
  getOrCreateFoodId,
  getAllRecipes
};
