const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let clientes = [];

app.get('/clients', (req, res) => {
  res.json(clientes);
});

app.post('/clients', (req, res) => {
  const cliente = {
    id: clientes.length + 1,
    nome: req.body.nome,
    telefone: req.body.telefone
  };
  clientes.push(cliente);
  res.status(201).json(cliente);
});

app.listen(5002, () => console.log('Clientes rodando na porta 5002'));
