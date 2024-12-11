const db = require('../utils/db');

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
  }

  try {
    const query = 'SELECT user_id, expires_at FROM tokens WHERE token = $1';
    const result = await db.query(query, [token]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Accès refusé. Token invalide.' });
    }

    const tokenData = result.rows[0];

    const now = new Date();
    if (now > tokenData.expires_at) {
      return res.status(401).json({ message: 'Accès refusé. Token expiré.' });
    }

    req.user = { user_id: tokenData.user_id };
    next();
  } catch (error) {
    console.error('Erreur lors de la vérification du token opaque :', error.message);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

module.exports = authMiddleware;
