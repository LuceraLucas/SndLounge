import React, { useState } from 'react';
import axios from 'axios';
import './CadastroCliente.css';

function CadastroCliente() {
  const [cliente, setCliente] = useState({
    nome: '',
    email: '',
    telefone: '',
    password: ''
  });

  const [mensagem, setMensagem] = useState('');
  const [mensagemTipo, setMensagemTipo] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCliente((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    cadastrarCliente();
  };

  const cadastrarCliente = () => {
    axios
      .post('http://localhost:3001/clientes', cliente)
      .then((response) => {
        console.log(response.data);
        setMensagem('Sucesso no Cadastro');
        setMensagemTipo('success');
        setCliente({
          nome: '',
          email: '',
          telefone: '',
          password: ''
        });
      })
      .catch((error) => {
        console.log(error);
        setMensagem('Erro Inesperado');
        setMensagemTipo('error');
      });
  };

  return (
    <form className="cadastro" onSubmit={handleSubmit}>
      <img className="IconeCadastro" src="icon_cadastro.png" alt="Ícone de Cadastro" />
      <h1 className="TituloCadastro">Crie sua conta!</h1>
      <br />
      <div className="forms">
        <div>
          <label className="LabelForm" htmlFor="nome">
            Nome:
          </label>
          <input
            className="InputForm"
            type="text"
            id="nome"
            name="nome"
            value={cliente.nome}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div>
          <label className="LabelForm" htmlFor="email">
            E-mail:
          </label>
          <input
            className="InputForm"
            type="email"
            id="email"
            name="email"
            value={cliente.email}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div>
          <label className="LabelForm" htmlFor="telefone">
            Telefone:
          </label>
          <input
            className="InputForm"
            type="tel"
            id="telefone"
            name="telefone"
            value={cliente.telefone}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div>
          <label className="LabelForm" htmlFor="email">
            Senha:
          </label>
          <input
            className="InputForm"
            type="password"
            id="password"
            name="password"
            value={cliente.password}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <br />
      <div className="divButton">
        <button className="button" type="submit">
          Cadastrar
        </button>
        
      </div>
      {mensagem && <span className={`mensagem-${mensagemTipo}`}>{mensagem}</span>}
    </form>
  );
}

export default CadastroCliente;