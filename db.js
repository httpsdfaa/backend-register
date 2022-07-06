require('dotenv').config();
const mysql = require('mysql2');

module.exports = (firstNamePARAM, surnamePARAM, emailPARAM, passPARAM) => {
    const connection = mysql.createConnection({
        host: process.env.devHOST,
        user: process.env.devUSER,
        database: process.env.devDB
    })

    const queryINSERT = 'INSERT INTO `db_user` (`name`, `surname`, `email`, `password`, `registered`) VALUES(?, ?, ?, ?, ?)'
    const queryVALUES = [firstNamePARAM, surnamePARAM, emailPARAM, passPARAM, new Date()]
    
    connection.query(
        queryINSERT,
        queryVALUES,
        function (err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(err)
        }
    );

    connection.end();
}
