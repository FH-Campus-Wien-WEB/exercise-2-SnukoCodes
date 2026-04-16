const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movieModel = require('./movie-model.js');
const { get } = require('http');

const app = express();

// Parse urlencoded bodies
app.use(bodyParser.json()); 

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')));

// Configure a 'get' endpoint for all movies..
app.get('/movies', function (req, res) {
  const movies = movieModel.getMovies();
  res.json(Object.values(movies));
});

// Configure a 'get' endpoint for a specific movie
app.get('/movies/:imdbID', function (req, res) {
  const imdbID = req.params.imdbID;
  const movie = movieModel.getMovies()[imdbID];
  if (movie) {
    res.send(JSON.stringify(movie));
  } else {
    res.sendStatus(404);
  }
});

// PUT endpoint to update an existing movie
app.put('/movies/:imdbID', function (req, res) {
  const imdbID = req.params.imdbID;
  if (movieModel.updateMovie(imdbID, req.body)) {
    res.sendStatus(200);
  } else {
    const created = movieModel.addMovie(imdbID, req.body);
    res.status(201).json(created);
  }
});


app.listen(3000)

console.log("Server now listening on http://localhost:3000/")

