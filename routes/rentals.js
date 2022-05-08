const {Rental, validate} = require('../models/rental');
const {Movie} = require('../models/movie');
const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

const notFoundMessage = 'The rental with the given ID was not found.';
const invalidMovieMessge = 'Could not find the movie you wanted.';
// remains:
//add functionality for movie not in stock
// fix so that we can only fetch title for movie
// expand du include for array of movies

router.get('/', async (req, res) => {
    const movie = await Rental.find();
    res.send(movie);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movies = [];
  for (const movieId of req.body.movieIds) {
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).send(invalidMovieMessge);
    movies.push(movie);
    console.log(movies);
  }
  res.send('done');
});


//   let rental = new Rental({ 
//     movies: [{
//       _id: movie._id,
//       title: movie.title,
//       genre: movie.genre,
//       dailyRentalRate: movie.dailyRentalRate,
//       numberInStock: movie.numberInStock
//     }]
//   });
//   try {
//     rental =  await rental.save();
//     res.send(rental);
//   }
//   catch(e) {
//     res.status(401).send(e);
//   }
// });

module.exports = router;

