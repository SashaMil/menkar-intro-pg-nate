const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use( bodyParser.urlencoded({extended: true}) );
app.use( bodyParser.json() );

//Setup router
const songRouter = require('./routes/song-router');
const rankingRouter = require('./routes/ranking-router');
app.use('/song', songRouter);

//Client Side
app.use(express.static('server/public'));

const PORT = process.env.PORT || 5000;
app.listen( PORT, function() {
  console.log('Server is listening on ', PORT);
})
