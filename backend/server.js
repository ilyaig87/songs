const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/songs', (req, res) => {
  const songs = [];

  fs.createReadStream('data.csv')
    .pipe(csv({ separator: ';' })) 
    .on('data', (row) => {
      const transformedSong = {
        song: row['Song Name'].toLowerCase(),
        band: row.Band.toLowerCase(),
        year: row.Year,
      };
      songs.push(transformedSong);
    })
    .on('end', () => {
      const sortedSongs = songs.sort((a, b) => {
        return a.band.localeCompare(b.band);
      });
      res.json(sortedSongs);
    })
    .on('error', (error) => {
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
