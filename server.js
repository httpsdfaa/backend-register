const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { PORT } = require('./config');
const db = require('./db')

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

    res.status(200).send("Success");
    res.status(404).send("Not Found");
})


App.listen(PORT.dev, () => {
    console.log(`Servidor sendo executado na porta: ${PORT.dev}`)
})