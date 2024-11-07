const pool = require('../utils/db');

const User = {
  getAll: async () => {
    const result = await pool.query('SELECT * FROM public."users"');
    return result.rows;
  },
  findByEmail: async (email) => {
    const result = await pool.query('SELECT * FROM public."users" WHERE email = $1', 
      [email]);
    return result.rows[0];
  },
  findById: async (user_id) => {
    const result = await pool.query('SELECT * FROM public."users" WHERE user_id = $1', 
      [user_id]);
    return result.rows[0];
  },
  create: async (user) => {
    const result = await pool.query(
      'INSERT INTO public."users" (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [user.username, user.email, user.password]);
    return result.rows[0];
  },
  delete: async (user_id) => {
    const result = await pool.query('DELETE FROM public."users" WHERE user_id = $1 RETURNING *', [user_id]);
    return result.rows[0];
  },
  updatePassword: async (email, newPassword) => {
    const result = await pool.query(
      'UPDATE public."users" SET password = $1 WHERE email = $2 RETURNING *',
      [newPassword, email]
    );
    return result.rows[0];
  },
  getRestrictionsByUserId: async (user_id) => {
    const result = await pool.query(
      `SELECT ingredient_name
      FROM public."dietary_restrictions"
      INNER JOIN public."ingredients" ON dietary_restrictions.ingredient_id = ingredients.ingredient_id
      WHERE dietary_restrictions.user_id = $1`,
      [user_id]
    );
    return result.rows;
  },
  updateRestrictions: async (user_id, restrictions) => {
    try {
      if (!user_id) {
        throw new Error("user_id est manquant");
      }
      await pool.query('DELETE FROM public."dietary_restrictions" WHERE user_id = $1', [user_id]);
  
      if (restrictions.length > 0) {
        const restrictionsQuery = `
          INSERT INTO public."dietary_restrictions" (user_id, ingredient_id, created_at)
          SELECT $1, ingredient_id, CURRENT_TIMESTAMP 
          FROM public."ingredients"
          WHERE ingredient_name = ANY($2::text[])
        `;
        await pool.query(restrictionsQuery, [user_id, restrictions]);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des restrictions alimentaires :", error);
      throw new Error('Erreur lors de la mise à jour des restrictions.');
    }
  }    
};

module.exports = User;
