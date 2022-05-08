const {Movie, validate} = require('../models/movie');
const {Genre} = require('../models/genre');
const express = require('express');
const router = express.Router();

const notFoundMessage = 'The movie with the given ID was not found.';
const invalidGenreMessge = 'Invalid genre.';

router.get('/', async (req, res) => {
    const movie = await Movie.find().sort('title');
    res.send(movie);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(404).send(invalidGenreMessge);


  let movie = new Movie({ 
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  try {
    movie =  await movie.save();
    res.send(movie);
  }
  catch(e) {
    res.status(400).send(e);
  }

});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(404).send(invalidGenreMessge);


  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, {
      $set: {
        title: req.body.title,
        genre: {
          _id: genre._id,
          name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
      }
    }, { new: true });
    res.send(movie);
  }
  catch(e) {
    if (e.name == 'CastError')
      return res.status(404).send(notFoundMessage);
    else
      return res.status(400).send(e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(404).send(notFoundMessage);
    res.send(movie);
  }
  catch(e) {
    if (e.name == 'CastError')
      return res.status(404).send(notFoundMessage);
    else
      return res.status(400).send(e);
  }

});

router.get('/:id', async (req, res) => {
  
  try{
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send(notFoundMessage);
    res.send(movie);
  }
  catch(e) {
    if (e.name == 'CastError')
      return res.status(404).send(notFoundMessage);
    else
      return res.status(400).send(e);
  }

});

module.exports = router;

