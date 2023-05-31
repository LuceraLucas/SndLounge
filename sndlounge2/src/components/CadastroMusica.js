import React, { useState } from 'react';
import axios from 'axios';
import './CadastroCliente.css';

function CadastroMusica({ email, isLoggedIn }) {
  const [musicas, setMusicas] = useState({
    email: email,
    nomeMusica: '',
    artista: '',
    genero: '',
    motivo: ''
  });

  const [mensagem, setMensagem] = useState('');
  const [mensagemTipo, setMensagemTipo] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMusicas((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    cadastrarMusica();
  };

  const cadastrarMusica = () => {
    axios
      .post('http://localhost:3001/musicas', musicas)
      .then((response) => {
        console.log(response.data);
        setMensagem('Sucesso no Cadastro');
        setMensagemTipo('success');
        setMusicas({
          email: '',
          nomeMusica: '',
          artista: '',
          genero: '',
          motivo: ''
        });
      })
      .catch((error) => {
        console.log(error);
        setMensagem('Erro Inesperado');
        setMensagemTipo('error');
      });
  };

  return (
    <div>
      {isLoggedIn ? (
        // Exibe informações do usuário logado
        <form className="cadastro" onSubmit={handleSubmit}>
          <img className="IconeCadastro" src="music.png" alt="Ícone de Cadastro" />
          <h1 className="TituloCadastro">Cadastre sua Música Favorita!</h1>
          <br />
          <div className="forms">
            <div>
              <label className="LabelForm" htmlFor="nomeMusica">
                Nome da música:
              </label>
              <input
                className="InputForm"
                type="text"
                id="nomeMusica"
                name="nomeMusica"
                value={musicas.nomeMusica}
                onChange={handleInputChange}
              />
            </div>
            <br />
            <div>
              <label className="LabelForm" htmlFor="artista">
                Artista:
              </label>
              <input
                className="InputForm"
                type="text"
                id="artista"
                name="artista"
                value={musicas.artista}
                onChange={handleInputChange}
              />
            </div>
            <br />
            <div>
              <label className="LabelForm" htmlFor="genero">
                Gênero:
              </label>
              <input
                className="InputForm"
                type="text"
                id="genero"
                name="genero"
                value={musicas.genero}
                onChange={handleInputChange}
              />
            </div>
            <br />
            <div>
              <label className="LabelForm" htmlFor="motivo">
                Essa música é importante para mim porque:
              </label>
              <input
                className="InputForm"
                type="text"
                id="motivo"
                name="motivo"
                value={musicas.motivo}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <br />
          <div className="divButton">
            <button className="button" type="submit">
              Enviar!
            </button>
          </div>
          {mensagem && <span className={`mensagem-${mensagemTipo}`}>{mensagem}</span>}
        </form>
      ) : (
        // Exibe link de login
        <h1>Faça login para cadastrar músicas</h1>
      )}
    </div>
  );
}

export default CadastroMusica;