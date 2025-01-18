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

app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(`https://${req.hostname}${req.url}`);
    }
    next();
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.static(path.join(__dirname, 'public'));
app.use('/users', userRoutes);
app.use('/openai', openaiRoutes);
app.use('/recipes', recipeRoutes);
app.use('/shopping-list', shoppingListRoutes);
app.use('/api', foodRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(errorHandler);

module.exports = app;
