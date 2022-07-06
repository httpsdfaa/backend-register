const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { DATABASE } = require('./db');

const { PORT } = require('./config');


const App = express();

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }))
App.use(cors());


App.get('/', (req, res) => {
    res.send('hello world')
})

App.post('/api/register', (req, res) => {
    const data = {
        firstName: req.body.firstName,
        surname: req.body.surname,
        email: req.body.email,
        pass: req.body.pass
    }

    res.status(200).json({
        status_code: 1,
        data: req.body
    })

    // ADICIONANDO DADOS NO BANCO DE DADOS
    DATABASE.insert_db(
        data.firstName,
        data.surname,
        data.email,
        data.pass
    )
})

App.post('/api/login', (req, res) => {
    const data = {
        email: req.body.email,
        pass: req.body.pass
    }

    res.status(200).json({
        status_code: 1,
        data: req.body
    })

    DATABASE.query_DB(
        data.email,
        data.pass
    )
})


App.listen(PORT.dev, () => {
    console.log(`Servidor sendo executado na porta: ${PORT.dev}`)
})