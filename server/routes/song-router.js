const express = require('express');
const router = express.Router();

// Get our connection to the database
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  console.log('In song-router GET to read');

  // Build a string for the query
  const queryText = 'SELECT * FROM songs';
  pool.query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error getting all songs: ', err);
      res.sendStatus(500);
    })
});

router.post('/', (req, res) => {
  console.log('In song-router POST to create');
  // Post generally uses the request body to get the data to add/insert/create

  res.sendStatus(200);
});

router.put('/', (req, res) => {
  // Put generally uses request params to identify the thing to update

  // And also uses the request body to get the data to update

  console.log('In song-router PUT to update');
  res.sendStatus(200);
});

router.delete('/:id', (req, res) => {
  // Delete generally uses request params to identify the thing to delete
  const songId = req.params.id;
  console.log('In song-router DELETE to delete the song with id:', songId);

  const queryText = 'DELETE FROM songs WHERE id=$1';
  // Passing two things to the query. 1) the query text
  // 2) an array of values to substitute into the query for the $1, $2, etc. 
  //    when subbing in multiple things, the order is important.
  pool.query(queryText, [songId])
    .then((results)=>{
      console.log('Successful delete of song', results);
      res.sendStatus(200);
    }).catch((err)=>{
      console.log('Error deleting of song', err);
      res.sendStatus(500);
    })
});

module.exports = router;