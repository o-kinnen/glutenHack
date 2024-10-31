const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.getAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
exports.signupUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Ce compte existe déjà'});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });
    const token = jwt.sign({ id: newUser.id_user, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV,
      sameSite: 'Strict',
      maxAge: 3600000
    });
    res.status(201).json({ message: 'Utilisateur enregistré avec succès'});
  } catch (error) {
    console.log('Erreur attrapée dans signupUser:', error.message); // Ajoutez cette ligne pour voir l'erreur
    next(error);
  }
};