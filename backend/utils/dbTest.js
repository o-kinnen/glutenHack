const path = require('path');

require('dotenv').config({
    override: true,
    path: path.join(__dirname, '../.env')
});

const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    port: process.env.DB_PORT,
    password: process.env.PASSWORD,
    database: process.env.NODE_ENV === 'test' ? process.env.DATABASETEST : process.env.DATABASE
});

module.exports = pool;