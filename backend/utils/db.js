const { Pool } = require('pg');
const path = require('path');

// Charge les variables d'environnement depuis .env si en local
require('dotenv').config({
    override: true,
    path: path.join(__dirname, '../.env')
});

// Création du pool de connexion avec Heroku DATABASE_URL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Important pour se connecter à Heroku PostgreSQL
    }
});

module.exports = pool;
