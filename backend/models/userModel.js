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
  findById: async (id) => {
    const result = await pool.query('SELECT * FROM public."users" WHERE id = $1', 
      [id]);
    return result.rows[0];
  },
  create: async (user) => {
    const result = await pool.query(
      'INSERT INTO public."users" (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [user.username, user.email, user.password]);
    return result.rows[0];
  },
  delete: async (id) => {
    const result = await pool.query('DELETE FROM public."users" WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};

module.exports = User;