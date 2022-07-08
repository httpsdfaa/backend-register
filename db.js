require('dotenv').config();

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.devHOST,
    user: process.env.devUSER,
    database: process.env.devDB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

module.exports = pool;