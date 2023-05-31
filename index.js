const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Desanima30052002',
  database: 'sndLounge'
});

connection.connect((error) => {
  if (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    return;
  }
  console.log('Conexão com o banco de dados estabelecida.');
});

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

app.post('/clientes', (req, res) => {
  const { nome, email, telefone, password } = req.body;

  const query = `INSERT INTO tbUsuario (nome, email, telefone, senha) VALUES (?, ?, ?, ?)`;
  const values = [nome, email, telefone, password];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Erro ao inserir cliente no banco de dados:', error);
      res.status(500).send('Ocorreu um erro ao cadastrar o cliente.');
    } else {
      console.log('Cliente cadastrado com sucesso!');
      res.status(200).send('Cliente cadastrado com sucesso!');
    }
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM tbUsuario WHERE email = ?';
  connection.query(query, [email], (error, results) => {
    if (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({ success: false, message: 'Erro ao realizar o login' });
    } else {
      if (results.length === 0) {
        // Usuário não encontrado
        res.status(401).json({ success: false, message: 'Usuário não encontrado' });
        console.log("DEU BO")
      } else {
        const user = results[0];
        if (password == user.senha) {
          // Login bem-sucedido
          console.log(user.nome)
          res.status(200).json({ success: true, message: 'Login realizado com sucesso', nome:user.nome });
        } else {
          // Senha incorreta
          res.status(401).json({ success: false, message: 'Senha incorreta' });
          console.log("DEU MERDA" , password , user.senha)
        }
      }
    }
  });
});

app.post('/musicas', (req, res) => {
  const { email, nomeMusica, artista, genero, motivo } = req.body;

  const query = `INSERT INTO tbMusica (email, nomeMusica, artista, genero, motivo) VALUES (?, ?, ?, ?, ?)`;
  const values = [email, nomeMusica, artista, genero, motivo];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Erro ao inserir música no banco de dados:', error);
      res.status(500).send('Ocorreu um erro ao cadastrar a música.');
    } else {
      console.log('Música cadastrada com sucesso!');
      res.status(200).send('Música cadastrada com sucesso!');
    }
  });
});

app.get('/musicalist', (req, res) => {
  const { email } = req.query;
  const query = 'SELECT nomeMusica, artista, genero, motivo FROM tbMusica WHERE email = ?';
  const params = [email];

  connection.query(query, params, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao buscar as músicas' });
    } else {
      res.json(results);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});