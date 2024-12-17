module.exports = (error, req, res, next) => {
  console.log('Middleware error handler appelé avec l\'erreur :', error.message);
  res.status(error.status || 500);
  res.json({ error: error.message });
};

