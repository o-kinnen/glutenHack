const path = require('path');

require('dotenv').config({
    override: true,
    path: path.join(__dirname, '../.env')
});

const {Pool, Client} = require('pg');
const pool = new Pool({
    host :  process.env.HOST,
    user : process.env.USER,
    port : process.env.DB_PORT,
    password : process.env.PASSWORD,
    database : process.env.DATABASETEST
});

module.exports = pool;