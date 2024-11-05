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
      `SELECT restriction_name, restriction_type
      FROM public."dietary_restrictions"
      INNER JOIN public."user_restrictions" ON dietary_restrictions.restriction_id = user_restrictions.restriction_id
      WHERE user_restrictions.user_id = $1`,
      [user_id]
    );
    return result.rows;
  },
  updateRestrictions: async (user_id, allergies, intolerances) => {
    await pool.query('DELETE FROM public."user_restrictions" WHERE user_id = $1', [user_id]);

    if (allergies.length > 0) {
      const allergyQuery = `
        INSERT INTO public."user_restrictions" (user_id, restriction_id)
        SELECT $1, restriction_id FROM public."dietary_restrictions"
        WHERE restriction_name = ANY($2::text[]) AND restriction_type = 'allergie'
      `;
      await pool.query(allergyQuery, [user_id, allergies]);
    }

    if (intolerances.length > 0) {
      const intoleranceQuery = `
        INSERT INTO public."user_restrictions" (user_id, restriction_id)
        SELECT $1, restriction_id FROM public."dietary_restrictions"
        WHERE restriction_name = ANY($2::text[]) AND restriction_type = 'intolérance'
      `;
      await pool.query(intoleranceQuery, [user_id, intolerances]);
   }
  }
};

module.exports = User;
