const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./db');
const { PORT } = require('./config');

const App = express();

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }))
App.use(cors());

App.get('/', (req, res) => {
    res.send('hello world')
})

App.post('/api/register', async(req, res) => {

    const { firstName, surname, email, pass } = req.body

    const string_DB = {
        insert: {
            INSERT_INTO: 'INSERT INTO `db_user` (`name`, `surname`, `email`, `password`, `registered`) VALUES(?, ?, ?, ?, ?)',
            VALUES_INTO: [firstName, surname, email, pass, new Date()]
        },
        querySELECT:  {
            SELECT: 'SELECT email, password FROM db_user WHERE email=?',
            VALUES_SELECT: [email]
        }
    
    }

    const { INSERT_INTO, VALUES_INTO} = string_DB.insert
    const { SELECT, VALUES_SELECT } = string_DB.querySELECT


    await pool.promise().query(SELECT, VALUES_SELECT)
        .then(([rows, fields]) => {

            if (rows[0] == undefined) {
                pool.promise().query(INSERT_INTO, VALUES_INTO)
                    .then(([rows, fields]) => {
                        res.status(200).send({
                            status: 'usuário criado com sucesso',
                            data: req.body
                        })
                    })
                    .catch(console.log)
            } else if (rows[0].email === email)
                res.status(401).send({
                    status: 'usuário já cadastrado',
                    data: req.body
                })

        })
        .catch(console.log)
})

App.post('/api/login', (req, res) => {
    const { email, pass } = req.body

    const querySELECT = 'SELECT email, password FROM db_user WHERE email=? AND password=?'
    const VALUES = [email, pass]

    pool.promise().query(querySELECT, VALUES)

        .then(([rows, fields]) => {

            if (rows[0] == undefined) {
                res.status(401).send({
                    status: 'Usuário ou senha incorreto',
                    access: 'Negado',
                    login: req.body
                    
                })
            } else if (rows[0].email === email && rows[0].password === pass) {
                res.status(200).send({
                    status: 'Usuário existe',
                    access: 'Autorizado',
                    login: req.body
                    

                })
            }
        })
        .catch(console.log)
})


App.listen(PORT.dev, () => {
    console.log(`Servidor sendo executado na porta: ${PORT.dev}`)
})