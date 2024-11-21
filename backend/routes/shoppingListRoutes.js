const express = require('express');
const router = express.Router();
const shoppingListController = require('../controllers/shoppingListController');
const authMiddleware = require('../middlewares/auth');


router.post('/add', authMiddleware, shoppingListController.addToShoppingList);
router.get('/', authMiddleware, shoppingListController.getShoppingList);
router.delete('/delete', authMiddleware, shoppingListController.deleteFromShoppingList);
router.post('/update-quantity', authMiddleware, shoppingListController.updateQuantity);

module.exports = router;
