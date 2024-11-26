const pool = require('../utils/db');

const User = {
  getAll: async () => {
    const result = await pool.query('SELECT * FROM "users"');
    return result.rows;
  },

  findByEmail: async (email) => {
    const result = await pool.query('SELECT * FROM "users" WHERE email = $1', [email]);
    return result.rows[0];
  },

  findById: async (user_id) => {
    const result = await pool.query('SELECT * FROM "users" WHERE user_id = $1', [user_id]);
    return result.rows[0];
  },

  create: async (user) => {
    const result = await pool.query(
      'INSERT INTO "users" (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [user.username, user.email, user.password]
    );
    return result.rows[0];
  },

  delete: async (user_id) => {
    try {
      await pool.query('DELETE FROM "dietary_restrictions" WHERE user_id = $1', [user_id]);
      await pool.query('DELETE FROM "favorites" WHERE user_id = $1', [user_id]);
      await pool.query('DELETE FROM "shopping_list_items" WHERE list_id IN (SELECT list_id FROM "shopping_list" WHERE user_id = $1)', [user_id]);
      await pool.query('DELETE FROM "shopping_list" WHERE user_id = $1', [user_id]);

      const result = await pool.query('DELETE FROM "users" WHERE user_id = $1 RETURNING *', [user_id]);
      return result.rows[0];
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      throw new Error('Erreur lors de la suppression de l’utilisateur.');
    }
  },

  updatePassword: async (email, newPassword) => {
    const result = await pool.query(
      'UPDATE "users" SET password = $1 WHERE email = $2 RETURNING *',
      [newPassword, email]
    );
    return result.rows[0];
  },

  getRestrictionsByUserId: async (user_id) => {
    try {
      const result = await pool.query(
        `SELECT a.allergen_name
         FROM "dietary_restrictions" dr
         INNER JOIN "allergens" a ON dr.allergen_id = a.allergen_id
         WHERE dr.user_id = $1`,
        [user_id]
      );
      return result.rows.map(row => row.allergen_name);
    } catch (error) {
      console.error("Erreur lors de la récupération des restrictions alimentaires :", error);
      throw new Error('Erreur lors de la récupération des restrictions alimentaires.');
    }
  },

  updateRestrictions: async (user_id, allergenIds) => {
    try {
        if (!user_id) {
            throw new Error("L'ID utilisateur est manquant.");
        }
        
        await pool.query('DELETE FROM "dietary_restrictions" WHERE user_id = $1', [user_id]);

        if (allergenIds.length > 0) {
            const insertQuery = `
                INSERT INTO "dietary_restrictions" (user_id, allergen_id, created_at)
                SELECT $1, unnest($2::int[]), CURRENT_TIMESTAMP
            `;
            await pool.query(insertQuery, [user_id, allergenIds]);
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour des restrictions alimentaires :", error);
        throw new Error('Erreur lors de la mise à jour des restrictions.');
    }
  },

  addFoodToFridge : async (userId, foodName, quantity) => {
    try {
      const foodResult = await pool.query('SELECT food_id FROM foods WHERE food_name = $1', [foodName]);

      if (foodResult.rows.length === 0) {
        throw new Error('Aliment non trouvé.');
      }

      const foodId = foodResult.rows[0].food_id;

      await pool.query(
        'INSERT INTO users_fridge (user_id, food_id, quantity) VALUES ($1, $2, $3)',
        [userId, foodId, quantity]
      );
    } catch (error) {
      throw error;
    }
  },
  getFridgeContents: async (userId) => {
    try {
      const result = await pool.query(`
        SELECT f.food_name, uf.quantity 
        FROM users_fridge uf
        JOIN foods f ON uf.food_id = f.food_id
        WHERE uf.user_id = $1`, [userId]);
  
      return result.rows;
    } catch (error) {
      console.error('Erreur lors de la récupération des aliments du réfrigérateur :', error);
      throw error;
    }
  },
  removeFoodFromFridge: async (userId, foodName) => {
    try {
      const foodResult = await pool.query('SELECT food_id FROM foods WHERE food_name = $1', [foodName]);
  
      if (foodResult.rows.length === 0) {
        throw new Error('Aliment non trouvé.');
      }
  
      const foodId = foodResult.rows[0].food_id;

      const deleteResult = await pool.query(
        'DELETE FROM users_fridge WHERE user_id = $1 AND food_id = $2 RETURNING *',
        [userId, foodId]
      );
  
      if (deleteResult.rows.length === 0) {
        throw new Error('Aliment non trouvé dans le réfrigérateur de l\'utilisateur.');
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'aliment du réfrigérateur :", error);
      throw error;
    }
  },
  updateFoodQuantity: async (userId, foodName, quantity, unit) => {
    try {
      const foodResult = await pool.query('SELECT food_id FROM foods WHERE food_name = $1', [foodName]);
  
      if (foodResult.rows.length === 0) {
        throw new Error('Aliment non trouvé.');
      }
  
      const foodId = foodResult.rows[0].food_id;
      const quantityWithUnit = `${quantity} ${unit}`.trim();
  
      await pool.query(
        'UPDATE users_fridge SET quantity = $1 WHERE user_id = $2 AND food_id = $3',
        [quantityWithUnit, userId, foodId]
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la quantité de l'aliment :", error);
      throw error;
    }
  }  
};

module.exports = User;
