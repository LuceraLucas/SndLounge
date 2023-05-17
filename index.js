const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

app.post('/clientes', (req, res) => {
  // aqui você pode inserir os dados do cliente no banco de dados
  console.log(req.body);
  res.send('Cliente cadastrado com sucesso!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});