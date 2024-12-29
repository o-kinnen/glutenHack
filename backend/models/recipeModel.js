const db = require('../utils/db');
const fs = require('fs');
const path = require('path');


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
      user_id,
      created_by_ai,
      public,
      image_url
    } = recipeData;
  
    const client = await db.connect();
    try {
      await client.query('BEGIN');
  
      const recipeQuery = `
        INSERT INTO recipes (recipe_name, instructions, preparation_time, difficulty, cuisine_type, number_of_person, category_type, allergens_list, user_id, created_by_ai, public, image_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
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
        allergens_list,
        user_id,
        created_by_ai,
        public,
        image_url
      ];
      const recipeResult = await client.query(recipeQuery, recipeValues);
      const recipeId = recipeResult.rows[0].recipe_id;
  
      for (const ingredient of ingredients) {
        const foodId = await getOrCreateFoodId(ingredient.food_name);
  
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
  

  const getAllRecipes = async (userId) => {
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
          r.created_by_ai,
          r.public,
          r.image_url,
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
        WHERE r.public = true AND r.user_id != $1 -- Exclure les recettes créées par l'utilisateur
        GROUP BY r.recipe_id
        ORDER BY r.created_at DESC;
      `;
  
      const result = await client.query(query, [userId]);
  
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
  
  

const getRecipesByUserId = async (user_id) => {
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
        r.created_by_ai,
        r.public,
        r.image_url,
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
      WHERE r.user_id = $1
      GROUP BY r.recipe_id
      ORDER BY r.created_at DESC;
    `;
  
    const result = await client.query(query, [user_id]);
  
    if (result.rows.length === 0) {
      return [];
    }
  
    return result.rows;
  } catch (error) {
    console.error('Erreur lors de la récupération des recettes pour cet utilisateur :', error);
    throw error;
  } finally {
    client.release();
  }
};

const deleteRecipeById = async (recipeId, userId) => {
  const client = await db.connect();
  try {
    await client.query('BEGIN');

    const verifyQuery = `
      SELECT image_url FROM recipes WHERE recipe_id = $1 AND user_id = $2;
    `;
    const verifyResult = await client.query(verifyQuery, [recipeId, userId]);
    if (verifyResult.rows.length === 0) {
      return false;
    }

    const imageUrl = verifyResult.rows[0].image_url;

    const deleteFavoritesQuery = `
      DELETE FROM favorites WHERE recipe_id = $1;
    `;
    await client.query(deleteFavoritesQuery, [recipeId]);

    const deleteIngredientsQuery = `
      DELETE FROM recipes_ingredients WHERE recipe_id = $1;
    `;
    await client.query(deleteIngredientsQuery, [recipeId]);

    const deleteRecipeQuery = `
      DELETE FROM recipes WHERE recipe_id = $1;
    `;
    await client.query(deleteRecipeQuery, [recipeId]);

    if (imageUrl) {
      const filePath = path.join(__dirname, '../uploads', path.basename(imageUrl));
    
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Erreur lors de la suppression de l'image : ${filePath}`, err);
          }
        });
      } else {
        console.warn(`Le fichier n'existe pas : ${filePath}`);
      }
    }
    
    await client.query('COMMIT');
    return true;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Erreur lors de la suppression de la recette :', error);
    throw error;
  } finally {
    client.release();
  }
};

const updateRecipe = async (recipeData) => {
  const {
    recipe_id,
    recipe_name,
    preparation_time,
    difficulty,
    number_of_person,
    cuisine_type,
    category_type,
    public: isPublic,
    allergens_list,
    instructions,
    ingredients,
    image_url,
  } = recipeData;

  const client = await db.connect();

  try {
    await client.query('BEGIN');

    const updateRecipeQuery = `
      UPDATE recipes
      SET recipe_name = $1,
          preparation_time = $2,
          difficulty = $3,
          number_of_person = $4,
          cuisine_type = $5,
          category_type = $6,
          public = $7,
          allergens_list = $8,
          instructions = $9,
          created_by_ai = false
          ${image_url ? ', image_url = $10' : ''}
      WHERE recipe_id = ${image_url ? '$11' : '$10'};
    `;
    
    const updateRecipeValues = [
      recipe_name,
      preparation_time,
      difficulty,
      number_of_person,
      cuisine_type,
      category_type,
      isPublic,
      allergens_list,
      instructions,
      ...(image_url ? [image_url, recipe_id] : [recipe_id]),
    ];

    await client.query(updateRecipeQuery, updateRecipeValues);

    const deleteIngredientsQuery = `DELETE FROM recipes_ingredients WHERE recipe_id = $1;`;
    await client.query(deleteIngredientsQuery, [recipe_id]);

    for (const ingredient of ingredients) {
      const foodId = await getOrCreateFoodId(ingredient.food_name);
      const insertIngredientQuery = `
        INSERT INTO recipes_ingredients (recipe_id, food_id, quantity)
        VALUES ($1, $2, $3);
      `;
      const insertIngredientValues = [recipe_id, foodId, ingredient.quantity || 'N/A'];
      await client.query(insertIngredientQuery, insertIngredientValues);
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Erreur lors de la mise à jour de la recette :', error);
    throw error;
  } finally {
    client.release();
  }
};

const addFavorite = async (userId, recipeId) => {
  try {
    await db.query(
      'INSERT INTO favorites (user_id, recipe_id) VALUES ($1, $2)',
      [userId, recipeId]
    );
  } catch (error) {
    throw error;
  }
};

const isFavorite = async (userId, recipeId) => {
  try {
    const result = await db.query(
      'SELECT * FROM favorites WHERE user_id = $1 AND recipe_id = $2',
      [userId, recipeId]
    );
    return result.rowCount > 0;
  } catch (error) {
    throw error;
  }
};

const removeFavorite = async (userId, recipeId) => {
  try {
    await db.query(
      'DELETE FROM favorites WHERE user_id = $1 AND recipe_id = $2',
      [userId, recipeId]
    );
  } catch (error) {
    throw error;
  }
};

const getFavoritesByUserId = async (userId) => {
  try {
    const result = await db.query(
      'SELECT recipe_id FROM favorites WHERE user_id = $1',
      [userId]
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const upsertRate = async (userId, recipeId, rating) => {
  const client = await db.connect();
  try {
    const query = `
      INSERT INTO reviews (user_id, recipe_id, rating, created_at)
      VALUES ($1, $2, $3, NOW())
      ON CONFLICT (user_id, recipe_id)
      DO UPDATE SET rating = $3, created_at = NOW();
    `;
    await client.query(query, [userId, recipeId, rating]);
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement ou de la mise à jour de l\'évaluation :', error);
    throw error;
  } finally {
    client.release();
  }
};

const getAverageRating = async (recipeId) => {
  const client = await db.connect();
  try {
    const query = `
      SELECT COALESCE(AVG(rating), 0) AS average_rating
      FROM reviews
      WHERE recipe_id = $1;
    `;
    const result = await client.query(query, [recipeId]);
    return result.rows[0].average_rating;
  } catch (error) {
    console.error('Erreur lors de la récupération de la moyenne des notes :', error);
    throw error;
  } finally {
    client.release();
  }
};

const getRateByRecipe = async (recipeId) => {
  const client = await db.connect();
  try {
    const query = `
      SELECT user_id, rating, created_at
      FROM reviews
      WHERE recipe_id = $1;
    `;
    const result = await client.query(query, [recipeId]);
    return result.rows;
  } catch (error) {
    console.error('Erreur lors de la récupération des notes :', error);
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  saveRecipe,
  getOrCreateFoodId,
  getAllRecipes,
  getRecipesByUserId,
  deleteRecipeById,
  updateRecipe,
  addFavorite,
  isFavorite,
  removeFavorite,
  getFavoritesByUserId,
  upsertRate,
  getAverageRating,
  getRateByRecipe
};
