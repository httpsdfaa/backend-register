require('dotenv').config();
const mysql = require('mysql2');
module.exports = {

    DATABASE: {
        insert_db: function (firstNamePARAM, surnamePARAM, emailPARAM, passPARAM) {
            const connection = mysql.createConnection({
                host: process.env.devHOST,
                user: process.env.devUSER,
                database: process.env.devDB
            })

            const INSERT = 'INSERT INTO `db_user` (`name`, `surname`, `email`, `password`, `registered`) VALUES(?, ?, ?, ?, ?)'
            const VALUES = [firstNamePARAM, surnamePARAM, emailPARAM, passPARAM, new Date()]

            connection.query(
                INSERT,
                VALUES,
                function (err, results, fields) {
                    console.log(results); // results contains rows returned by server
                    console.log(err)
                }
            );

            connection.end();
        },

        query_DB: function (emailPARAM, passPARAM, userExistPARAM, userNotFoundPARAM) {
            const connection = mysql.createConnection({
                host: process.env.devHOST,
                user: process.env.devUSER,
                database: process.env.devDB
            })

            const querySELECT = 'SELECT email, password FROM db_user WHERE email=? AND password=?'
            const VALUES = [emailPARAM, passPARAM]

            connection.query(
                querySELECT,
                VALUES,
                function (err, results, fields) {
                    if (results[0]) {
                        console.log(results[0])
                        return userExistPARAM
                    }
                    else if (!results[0]) {
                        console.log(results)
                        return userNotFoundPARAM
                    }
                }
            )

            connection.end()
        }
    }
}