const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const db = require('../utils/db');

exports.addToShoppingList = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Accès non autorisé. Aucun jeton fourni.' });
    }
    const result = await db.query('SELECT user_id FROM tokens WHERE token = $1 AND expires_at > NOW()', [token]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Jeton invalide ou expiré.' });
    }
    const userId = result.rows[0].user_id;
    const { recipeId } = req.body;
    if (!recipeId) {
      return res.status(400).json({ message: 'ID de recette manquant.' });
    }
    let listId;
    const existingList = await db.query('SELECT list_id FROM shopping_list WHERE user_id = $1 LIMIT 1', [userId]);
    if (existingList.rows.length > 0) {
      listId = existingList.rows[0].list_id;
    } else {
      const newList = await db.query(
        `INSERT INTO shopping_list (user_id, shopping_list_name, date_of_shopping) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING list_id`,
        [userId, 'Liste principale']
      );
      listId = newList.rows[0].list_id;
    }
    const ingredients = await db.query(
      `SELECT ri.food_id, ri.quantity FROM recipes_ingredients ri WHERE ri.recipe_id = $1`,
      [recipeId]
    );
    const promises = ingredients.rows.map(async (ingredient) => {
      const existingItem = await db.query(
        `SELECT quantity FROM shopping_list_items WHERE list_id = $1 AND food_id = $2`,
        [listId, ingredient.food_id]
      );
      if (existingItem.rows.length > 0) {
        const updatedQuantity = `${parseInt(existingItem.rows[0].quantity || 0, 10) + parseInt(ingredient.quantity || 0, 10)}`;
        await db.query(
          `UPDATE shopping_list_items SET quantity = $1 WHERE list_id = $2 AND food_id = $3`,
          [updatedQuantity, listId, ingredient.food_id]
        );
      } else {
        await db.query(
          `INSERT INTO shopping_list_items (list_id, food_id, quantity) VALUES ($1, $2, $3)`,
          [listId, ingredient.food_id, ingredient.quantity]
        );
      }
    });
    await Promise.all(promises);
    res.status(200).json({ message: 'Les ingrédients ont été ajoutés ou mis à jour dans la liste des courses.' });
  } catch (error) {
    console.error('Erreur lors de l\'ajout à la liste des courses :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.getShoppingList = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Accès non autorisé. Aucun jeton fourni.' });
    }
    const result = await db.query('SELECT user_id FROM tokens WHERE token = $1 AND expires_at > NOW()', [token]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Jeton invalide ou expiré.' });
    }
    const userId = result.rows[0].user_id;
    const listResult = await db.query('SELECT list_id FROM shopping_list WHERE user_id = $1 LIMIT 1', [userId]);
    if (listResult.rows.length === 0) {
      return res.status(404).json({ message: 'Aucune liste des courses trouvée.' });
    }
    const listId = listResult.rows[0].list_id;
    const items = await db.query(
      `SELECT f.food_id, f.food_name, f.category, sli.quantity
       FROM shopping_list_items sli
       JOIN foods f ON sli.food_id = f.food_id
       WHERE sli.list_id = $1`,
      [listId]
    );
    res.status(200).json({ listId, items: items.rows });
  } catch (error) {
    console.error('Erreur lors de la récupération de la liste des courses :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.deleteFromShoppingList = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Accès non autorisé. Aucun jeton fourni.' });
    }
    const result = await db.query('SELECT user_id FROM tokens WHERE token = $1 AND expires_at > NOW()', [token]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Jeton invalide ou expiré.' });
    }
    const userId = result.rows[0].user_id;
    const { food_name } = req.query;
    if (!food_name) {
      return res.status(400).json({ message: "Nom de l'aliment manquant." });
    }
    await db.query(
      `DELETE FROM shopping_list_items
       WHERE list_id = (SELECT list_id FROM shopping_list WHERE user_id = $1)
       AND food_id = (SELECT food_id FROM foods WHERE food_name = $2)`,
      [userId, food_name]
    );
    res.status(200).json({ message: 'Aliment supprimé de la liste des courses.' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'aliment :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

exports.updateQuantity = async (req, res) => {
  try {
    const { listId, foodId, incrementValue } = req.body;
    if (!listId || !foodId || incrementValue === undefined) {
      return res.status(400).json({ message: 'Données manquantes.' });
    }
    const result = await db.query(
      `SELECT quantity FROM shopping_list_items WHERE list_id = $1 AND food_id = $2`,
      [listId, foodId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Aliment non trouvé.' });
    }
    const currentQuantity = result.rows[0].quantity;
    const match = currentQuantity.match(/^(\d+)(.*)$/);
    if (!match) {
      return res.status(400).json({ message: 'La quantité ne peut pas être modifiée.' });
    }
    const numericPart = parseInt(match[1], 10);
    const unitPart = match[2];
    const newNumeric = numericPart + incrementValue;
    if (newNumeric <= 0) {
      return res.status(400).json({ message: 'La quantité ne peut pas être égale à 0 ou inférieure.' });
    }
    const newQuantity = `${newNumeric}${unitPart}`;
    await db.query(
      `UPDATE shopping_list_items SET quantity = $1 WHERE list_id = $2 AND food_id = $3`,
      [newQuantity, listId, foodId]
    );
    res.status(200).json({ message: 'Quantité mise à jour.', newQuantity });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la quantité :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};