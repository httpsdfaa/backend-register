require('dotenv').config();
const mysql = require('mysql2');

module.exports = () => {
    const connection = mysql.createConnection({
        host: process.env.devHOST,
        user: process.env.devUSER,
        database: process.env.devDB
    })

    connection.query(
        'SELECT * FROM `global_priv`',
        function (err, results, fields) {
            console.log(results); // results contains rows returned by server
        }
    );
}
