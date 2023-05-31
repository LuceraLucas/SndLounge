import React, { useState } from 'react';
import SongLyrics from './SongLyrics';
import { useNavigate } from 'react-router-dom';

function SongSearchForm() {
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');

  const handleArtistChange = (event) => {
    setArtist(event.target.value);
  };

  const handleSongChange = (event) => {
    setSong(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Aqui você pode fazer qualquer ação necessária com os dados de busca, como enviar para a API ou atualizar algum estado
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="artist">Artist:</label>
          <input type="text" id="artist" value={artist} onChange={handleArtistChange} />
        </div>
        <div>
          <label htmlFor="song">Song:</label>
          <input type="text" id="song" value={song} onChange={handleSongChange} />
        </div>
        <button type="submit">Search</button>
      </form>
      {artist && song && <SongLyrics artist={artist} song={song} />}
    </div>
  );
}

export default SongSearchForm;