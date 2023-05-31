import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CadastroCliente.css';

function ListaMusicas({ email, isLoggedIn }) {
  const [musicas, setMusicas] = useState([]);

  useEffect(() => {
    buscarMusicas();
  }, []);

  const buscarMusicas = async () => {
    try {
      const response = await axios.get('http://localhost:3001/musicalist', {
        params: {
          email: email
        }
      });
      setMusicas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        // Exibe informações do usuário logado
        <div>
          <h1>Minhas Músicas!</h1>
          {musicas.length === 0 ? (
            <p>Não há músicas cadastradas.</p>
          ) : (
            <ul className="music-list">
              {musicas.map((musica) => (
                <li key={musica.id}>
                  <strong>Nome da música:</strong> {musica.nomeMusica}
                  <br />
                  <strong>Artista:</strong> {musica.artista}
                  <br />
                  <strong>Gênero:</strong> {musica.genero}
                  <br />
                  <strong>Motivo:</strong> {musica.motivo}
                  <br />
                  <br />
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        // Exibe link de login
        <h1>Faça login para visualizar suas músicas</h1>
      )}
    </div>
  );
}

export default ListaMusicas;