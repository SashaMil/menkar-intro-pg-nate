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

router.post('/', (req, res)=> {
   console.log('Handling POST for /song', req.body);
   const queryText = `INSERT INTO songs (artist, track, published, rank)
                        Values
                        ($1, $2, $3, $4);`;
   pool.query(queryText, [req.body.artist, req.body.track, req.body.published, req.body.rank])
   .then((result)=>{
      console.log('Finished POST for /song', req.body);
      res.sendStatus(200);
   })
   .catch((error)=> {
      console.log('Error handling POST for /song', error);
      res.sendStatus(500);
   });
});

router.put('/:id', (req, res)=> {
   const id = req.params.id;
   const queryText = 'UPDATE songs SET artist = $2, track = $3, published = $4, rank = $5 WHERE id = $1;';
   console.log(queryText);
   pool.query(queryText, [id, req.body.artist, req.body.track, req.body.published, req.body.rank]).then((result)=> {
      console.log('Finished PUT for /song: ', result);
      res.sendStatus(200);
   }).catch((error)=>{
      console.log('Error handling PUT for /song: ', error);
      res.sendStatus(500);
   });
});

router.delete('/:id', (req, res)=> {
   console.log('Handling DELETE for /song');
   const id = req.params.id;
   const queryText = `DELETE FROM songs WHERE artist = $1`;
   pool.query(queryText, [id]).then((result)=> {
      console.log('Deleted from /song', id);
      res.sendStatus(200);
   }).catch((error)=> {
      console.log('Error handling DELETE for /song', error);
      res.sendStatus(500);
   });
});

module.exports = router;
