import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/songs')
      .then((response) => {
        const lowercaseSongs = response.data.map((song) => ({
          band: song.band.toLowerCase(),
          song: song.song.toLowerCase(),
          year: song.year, 
        }));

        const sortedSongs = lowercaseSongs.sort((a, b) => {
          return a.band.localeCompare(b.band);
        });

        setSongs(sortedSongs);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>Song List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <table className="song-table">
          <thead>
            <tr>
              <th>Band</th>
              <th>Song</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song, index) => (
              <tr key={index}>
                <td>{song.band}</td>
                <td>{song.song}</td>
                <td>{song.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
