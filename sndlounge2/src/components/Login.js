import React, { useState } from 'react';
import axios from 'axios';
import './CadastroCliente.css';



function Login(props) {
  const [mensagemTipo, setMensagemTipo] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let userName = '';
  const [errorMessage, setErrorMessage] = useState('');
  const [nome, setNome] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Cria um objeto com os dados de login
    const loginData = {
      email,
      password
    };

    // Faz a solicitação POST para a API do backend
    axios.post('http://localhost:3001/login', loginData)
      .then(response => {
        // Verifica a resposta da API
       if (response.data.success) {
          userName = response.data.nome;
          console.log('Login realizado com sucesso!');
          let mensagemBemvindo = 'Bem-Vindo(a), ' + userName;
          setErrorMessage(mensagemBemvindo);
          props.setIsLoggedIn(true);
          props.setNome(userName);
          props.setEmail(email); // <--- Alteração aqui
 
  console.log(userName);
  console.log(email);
  console.log(isLoggedIn);
  // Resto do código...
} else {
          console.log('Falha no login:', response.data.message);
          setErrorMessage(response.data.message);
        }
      })
      .catch(error => {
        // Erro na solicitação
        console.log('Erro na solicitação:', error);
        setErrorMessage('Erro inesperado. Por favor, tente novamente mais tarde.');
      });

    
  };

  return (

    
    <form onSubmit={handleSubmit}>
        <img className="IconeCadastro" src="iconLogin.png" alt="Ícone de Login" />
    <h1 className='TituloCadastro'>Faça Login</h1>
    <br/>
      <div>
        <label className='LabelForm' htmlFor="email">E-mail:</label>
        <input className='InputForm'
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <br/>
      <div>
        <label className='LabelForm' htmlFor="password">Senha:</label>
        <input className='InputForm'
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <br/>
      {errorMessage && <p className="error-message">{errorMessage} </p>}
      <div className='divButton'><button className='button' type="submit">Login</button></div>
    </form>
  );
}

export default Login;