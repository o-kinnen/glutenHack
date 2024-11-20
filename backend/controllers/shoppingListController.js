const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const db = require('../utils/db');

exports.addToShoppingList = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Accès non autorisé. Aucun token fourni.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user_id);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const { recipeId } = req.body;

    if (!recipeId) {
      return res.status(400).json({ message: 'ID de recette manquant.' });
    }

    const result = await db.query(
      `SELECT list_id FROM shopping_list WHERE user_id = $1 LIMIT 1`,
      [user.user_id]
    );

    let listId = result.rows.length ? result.rows[0].list_id : null;

    if (!listId) {
      const newList = await db.query(
        `INSERT INTO shopping_list (user_id, shopping_list_name, date_of_shopping)
         VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING list_id`,
        [user.user_id, 'Liste principale']
      );
      listId = newList.rows[0].list_id;
    };

    const ingredients = await db.query(
      `SELECT DISTINCT f.food_id, f.food_name
       FROM recipes_ingredients ri
       JOIN foods f ON ri.food_id = f.food_id
       WHERE ri.recipe_id = $1`,
      [recipeId]
    );

    const promises = ingredients.rows.map((ingredient) =>
        db.query(
            `INSERT INTO shopping_list_items (list_id, food_id)
            VALUES ($1, $2)
            ON CONFLICT (list_id, food_id) DO NOTHING`,
            [listId, ingredient.food_id]
        )
    );

    await Promise.all(promises);

    res.status(200).json({ message: 'Les aliments ont été ajoutés à la liste des courses.' });
    } catch (error) {
    console.error('Erreur lors de l\'ajout à la liste des courses :', error);
    res.status(500).json({ message: 'Erreur serveur.' });
    }
};
 
exports.getShoppingList = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Accès non autorisé. Aucun token fourni.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.user_id);

        if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        const items = await db.query(
            `SELECT DISTINCT f.food_name
            FROM shopping_list_items sli
            JOIN foods f ON sli.food_id = f.food_id
            WHERE sli.list_id = (SELECT list_id FROM shopping_list WHERE user_id = $1 LIMIT 1)`,
            [user.user_id]
        );
  
        res.status(200).json(items.rows.map(item => item.food_name));
    } catch (error) {
    console.error('Erreur lors de la récupération de la liste des courses:', error);
    res.status(500).json({ error: 'Erreur serveur.' });
    }
};

exports.deleteFromShoppingList = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Accès non autorisé. Aucun token fourni.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.user_id);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }  

        const { food_name } = req.query;
  
        if (!food_name) {
            return res.status(400).json({ message: 'Nom de l\'aliment manquant.' });
        }
  
        await db.query(
            `DELETE FROM shopping_list_items
            WHERE list_id = (SELECT list_id FROM shopping_list WHERE user_id = $1)
            AND food_id = (SELECT food_id FROM foods WHERE food_name = $2)`,
            [user.user_id, food_name]
        );
  
        res.status(200).json({ message: 'Aliment supprimé de la liste des courses.' });
        } catch (error) {
    console.error('Erreur lors de la suppression de l\'aliment :', error);
    res.status(500).json({ error: 'Erreur serveur.' });
    }
};
  
  