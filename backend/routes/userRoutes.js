const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

router.get('/', userController.getAllUsers);
router.post('/signup', userController.signupUser);
router.post('/login', userController.loginUser);
router.get('/profile', authMiddleware, userController.profileUser);
router.get('/check-auth', authMiddleware, userController.checkAuth);
router.post('/logout', userController.logoutUser);
router.delete('/delete', authMiddleware, userController.deleteUser);
router.post('/send-reset-link', userController.sendResetLink);
router.post('/reset-password', userController.resetPassword);
router.get('/verify-reset-token', userController.verifyResetToken);
router.put('/update-preferences/:id', authMiddleware, userController.updateUserPreferences);
router.get('/restrictions', authMiddleware, userController.getRestrictionsByUserId);
router.get('/fridge', authMiddleware, userController.getFridgeContents);
router.post('/fridge/add', authMiddleware, userController.addFoodToFridge);

module.exports = router;