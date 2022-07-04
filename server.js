const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PORT } = require('./config');

const App = express();
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }))
App.use(cors());

App.get('/', (req, res) => {
    res.send('hello world')
})

App.post('/api/register', (req, res) => {
    console.log(req.body)
})

App.listen(PORT.dev, () => {
    console.log(`Servidor sendo executado na porta ${PORT.dev}`)
})