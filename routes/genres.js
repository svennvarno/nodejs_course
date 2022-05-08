const {Genre, validate} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  try {
    genre =  await genre.save();
    res.send(genre);
  }
  catch(e) {
    res.send(e);
  }

});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  try {
    const genre = await Genre.findByIdAndUpdate(req.params.id, {
      $set: {
        name: req.body.name
      }
    }, { new: true });
    res.send(genre);
  }
  catch(e) {
    if (e.name == 'CastError')
      return res.status(404).send('The genre with the given ID was not found.');
    else
      return res.status(400).send(e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
  }
  catch(e) {
    if (e.name == 'CastError')
      return res.status(404).send('The genre with the given ID was not found.');
    else
      return res.status(400).send(e);
  }

});

router.get('/:id', async (req, res) => {
  
  try{
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
  }
  catch(e) {
    if (e.name == 'CastError')
      return res.status(404).send('The genre with the given ID was not found.');
    else
      return res.status(400).send(e);
  }

});

module.exports = router;

