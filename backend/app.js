const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const openaiRoutes = require('./routes/openaiRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const shoppingListRoutes = require('./routes/shoppingListRoutes');
const foodRoutes = require('./routes/foodRoutes');
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const path = require('path');

app.use(cors({
    origin: process.env.URL_FRONTEND,
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/users', userRoutes);
app.use('/openai', openaiRoutes);
app.use('/recipes', recipeRoutes);
app.use('/shopping-list', shoppingListRoutes);
app.use('/api', foodRoutes);
app.use(errorHandler);

module.exports = app;