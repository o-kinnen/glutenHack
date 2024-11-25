const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.user_id) {
      return res.status(401).json({ message: 'Accès refusé. Token invalide.' });
    }    
    
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error.message);
    res.status(401).json({ message: 'Accès refusé. Token invalide ou expiré.' });
  }
};

module.exports = authMiddleware;