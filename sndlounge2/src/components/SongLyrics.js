import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function SongLyrics() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const artist = searchParams.get('artist');
  const song = searchParams.get('song');
  const [lyrics, setLyrics] = useState('');

  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        const response = await axios.get(
          `https://api.vagalume.com.br/search.php?art=${artist}&mus=${song}&apikey={key}`
        );
        const data = response.data;
        if (data.mus && data.mus.length > 0) {
          setLyrics(data.mus[0].text);
        } else {
          setLyrics('Lyrics not found.');
        }
      } catch (error) {
        console.log(error);
        setLyrics('Error fetching lyrics.');
      }
    };

    if (artist && song) {
      fetchLyrics();
    }
  }, [artist, song]);

  return (
    <div>
      <h2>Lyrics</h2>
      <p>{lyrics}</p>
    </div>
  );
}

export default SongLyrics;