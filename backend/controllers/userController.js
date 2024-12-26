const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/userModel');
const pool = require('../utils/db');
const Clarifai = require('clarifai');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');



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
      return res.status(400).json({ message: 'Ce compte existe déjà.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600 * 1000); // 1 heure

    await pool.query(
      'INSERT INTO tokens (token, user_id, expires_at) VALUES ($1, $2, $3)',
      [token, newUser.user_id, expiresAt]
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 3600000,
    });

    res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
  } catch (error) {
    console.error('Erreur attrapée dans signupUser:', error.message);
    next(error);
  }
};


exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'Compte non trouvé.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    const restrictions = await User.getRestrictionsByUserId(user.user_id);

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600 * 1000); // 1 heure

    await pool.query(
      'INSERT INTO tokens (token, user_id, expires_at) VALUES ($1, $2, $3)',
      [token, user.user_id, expiresAt]
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 3600000,
    });

    res.status(200).json({
      message: 'Connexion réussie.',
      user: {
        user_id: user.user_id,
        email: user.email,
        restrictions,
      },
    });
  } catch (error) {
    console.error('Erreur lors de la connexion de l’utilisateur :', error);
    res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
  }
};


exports.profileUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.user_id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const restrictions = await User.getRestrictionsByUserId(user.user_id);

    res.status(200).json({
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      restrictions,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du profil :', error);
    next(error);
  }
};

exports.updateUserPreferences = async (req, res, next) => {
  const userId = req.params.id;
  const { restrictions } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "L'ID de l'utilisateur est manquant." });
  }

  try {
    const allergenIds = [];
    for (const restriction of restrictions) {
      const result = await pool.query('SELECT allergen_id FROM "allergens" WHERE allergen_name = $1', [restriction]);
      if (result.rows.length > 0) {
        allergenIds.push(result.rows[0].allergen_id);
      }
    }

    await User.updateRestrictions(userId, allergenIds);
    res.status(200).json({ message: 'Restrictions mises à jour avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour des préférences :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour des préférences.' });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    res.status(200).json({ authenticated: true, userId: req.user.user_id });
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'authentification :', error);
    res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.' });
  }
};

exports.logoutUser = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé.' });
  }

  try {
    await pool.query('DELETE FROM tokens WHERE token = $1', [token]);
    res.clearCookie('token');
    res.status(200).json({ message: 'Déconnexion réussie.' });
  } catch (error) {
    console.error('Erreur lors de la déconnexion :', error.message);
    res.status(500).json({ message: 'Erreur lors de la déconnexion.' });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.user_id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    await User.delete(user.user_id);

    await pool.query('DELETE FROM tokens WHERE user_id = $1', [user.user_id]);

    res.clearCookie('token');

    res.status(200).json({ 
      message: 'Compte utilisateur supprimé avec succès. Les recettes publiques ont été anonymisées, et les recettes privées ont été supprimées.' 
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de l’utilisateur :', error);
    next(error);
  }
};

exports.sendResetLink = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const resetLink = `${process.env.URL_FRONTEND}/reset-password?token=${token}`;
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Réinitialisation du mot de passe',
      html: `Cliquez sur ce <a href="${resetLink}">lien</a> pour réinitialiser votre mot de passe (valide pendant 15 minutes).`,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email de réinitialisation envoyé.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la communication avec le serveur. Veuillez réessayer plus tard.' });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token et nouveau mot de passe sont requis.' });
    }
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(400).json({ message: 'Le lien de réinitialisation a expiré.' });
      }
      return res.status(400).json({ message: 'Token invalide.' });
    }
    const user = await User.findByEmail(decoded.email);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updatePassword(user.email, hashedPassword);
    res.status(200).json({ success: true, message: 'Mot de passe réinitialisé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la communication avec le serveur. Veuillez réessayer plus tard.' });
  }
};

exports.verifyResetToken = (req, res) => {
  const token = req.query.token;
  if (!token) {
    return res.status(400).json({ message: 'Token manquant' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ success: true, message: 'Token valide' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Token invalide ou expiré' });
  }
};

exports.getRestrictionsByUserId = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const restrictions = await User.getRestrictionsByUserId(userId);

    return res.status(200).json({ restrictions });
  } catch (error) {
    console.error('Erreur lors de la récupération des restrictions alimentaires :', error);
    return res.status(500).json({ error: 'Erreur lors de la récupération des restrictions alimentaires.' });
  }
};

exports.addFoodToFridge = async (req, res) => {
  const { foodName, quantity } = req.body;
  const userId = req.user.user_id;

  try {
    await User.addFoodToFridge(userId, foodName, quantity);
    res.status(200).json({ message: 'Aliment ajouté au réfrigérateur avec succès.' });
  } catch (error) {
    if (error.message === 'Aliment non trouvé.') {
      res.status(404).json({ message: 'Aliment non trouvé.' });
    } else {
      console.error('Erreur lors de l\'ajout de l\'aliment au réfrigérateur :', error);
      res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'aliment.' });
    }
  }
};

exports.getFridgeContents = async (req, res) => {
  const userId = req.user.user_id;
  try {
    const fridgeContents = await User.getFridgeContents(userId);
    res.status(200).json(fridgeContents);
  } catch (error) {
    console.error('Erreur lors de la récupération des aliments du réfrigérateur :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des aliments du réfrigérateur.' });
  }
};

exports.removeFoodFromFridge = async (req, res) => {
  const userId = req.user.user_id;
  const { foodName } = req.query;

  try {
    await User.removeFoodFromFridge(userId, foodName);
    res.status(200).json({ message: 'Aliment supprimé du réfrigérateur avec succès.' });
  } catch (error) {
    if (error.message === 'Aliment non trouvé.') {
      res.status(404).json({ message: 'Aliment non trouvé.' });
    } else {
      console.error("Erreur lors de la suppression de l'aliment du réfrigérateur :", error);
      res.status(500).json({ message: "Erreur lors de la suppression de l'aliment." });
    }
  }
};

exports.updateFoodQuantity = async (req, res) => {
  const { foodName, quantity, unit } = req.body;
  const userId = req.user.user_id;

  try {
    await User.updateFoodQuantity(userId, foodName, quantity, unit);
    res.status(200).json({ message: 'Quantité de l\'aliment mise à jour avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la quantité de l\'aliment :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la quantité de l\'aliment.' });
  }
};

const clarifaiApp = new Clarifai.App({
  apiKey: `${process.env.CLARIFAI_API_KEY}`,
});

const upload = multer({ dest: 'uploads/' });

const { Translate } = require('@google-cloud/translate').v2;

const translate = new Translate({
  key: process.env.GOOGLE_TRANSLATE_API,
});

exports.analyzeImage = [
  upload.single('image'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'Aucun fichier fourni.' });
      }

      const imagePath = path.join(__dirname, '../', req.file.path);
      const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });

      const response = await clarifaiApp.models.predict('food-item-recognition', { base64: imageBase64 });

      fs.unlinkSync(imagePath);

      const concepts = response.outputs[0].data.concepts;

      const aliments = concepts.map(item => ({
        name: item.name,
        probability: item.value,
      }));

      const namesToTranslate = aliments.map(aliment => aliment.name);
      const [translations] = await translate.translate(namesToTranslate, 'fr');

      const translatedAliments = aliments.map((aliment, index) => ({
        ...aliment,
        name: translations[index]
      }));

      res.status(200).json({
        success: true,
        data: translatedAliments
      });
    } catch (error) {
      console.error('Erreur lors de l\'analyse de l\'image ou de la traduction :', error);
      res.status(500).json({
        success: false,
        message: 'Une erreur est survenue lors du traitement de votre demande.',
      });
    }
  },
];
