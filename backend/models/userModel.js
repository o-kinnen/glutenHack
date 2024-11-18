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
      if (!user_id || allergenIds.length === 0) {
        throw new Error("L'ID utilisateur ou les allergènes sont manquants.");
      }

      await pool.query('DELETE FROM "dietary_restrictions" WHERE user_id = $1', [user_id]);

      const insertQuery = `
        INSERT INTO "dietary_restrictions" (user_id, allergen_id, created_at)
        SELECT $1, unnest($2::int[]), CURRENT_TIMESTAMP
      `;
      await pool.query(insertQuery, [user_id, allergenIds]);
    } catch (error) {
      console.error("Erreur lors de la mise à jour des restrictions alimentaires :", error);
      throw new Error('Erreur lors de la mise à jour des restrictions.');
    }
  },
};

module.exports = User;
