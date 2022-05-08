const mongoose = require('mongoose');
const Joi = require('joi');
const {movieSchema} = require('./movie');


const rentalSchema = new mongoose.Schema({
  movies: [{ 
    type: movieSchema, 
    required: true
  }],
  // movie: {
  //   type: movieScheme,
  //   required: true
  // },
  rentalDate: {
    type: Date,
    default: Date.now()
  },
  deliveryDate: {
    type: Date,
    default: Date.now() + 2*24*60*60*1000
  }
});

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
  const schema = Joi.object({
    movieIds: Joi.array().items(Joi.string()).required(),
    rentalDate: Joi.date(),
    deliveryDate: Joi.date()
  });

  return schema.validate(rental);
}

module.exports.validate = validateRental;
module.exports.Rental = Rental;
