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
      return res.status(400).json({ message: 'Ce compte existe déjà.'});
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
    res.status(201).json({ message: 'Utilisateur enregistré avec succès.'});
  } catch (error) {
    console.log('Erreur attrapée dans signupUser:', error.message); 
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user) {
      console.error('User not found with email:', email);
      return res.status(404).json({ message: 'Compte non trouvé.' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error('Incorrect password for email:', email);
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV,
      sameSite: 'Strict',
      maxAge: 3600000
    });
    res.status(200).json({ message: 'Connexion réussie.' });
  } catch (error) {
    console.error('Error logging in user:', error);
    next(error);
  }
};

exports.profileUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Accès non autorisé.' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    res.status(200).json({ username: user.username, email: user.email });
  } catch (error) {
    console.log('Error:', error);
    next(error);
  }
};

exports.checkAuth = async (req, res, next) => {
  try {
    res.status(200).json({ authenticated: true });
  } catch (error) {
    next(error);
  }
};

exports.logoutUser = (req, res) => {
  const token = req.cookies.token; // Assurez-vous de récupérer le token des cookies
  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé.' });
  }
  res.clearCookie('token');
  res.status(200).json({ message: 'Déconnexion réussie.' });
};
