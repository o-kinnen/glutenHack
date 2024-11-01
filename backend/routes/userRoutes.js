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

module.exports = router;