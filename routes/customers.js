const {Customer, validate} = require('../models/customer');
const express = require('express');
const router = express.Router();

const notFoundMessage = 'The customer with the given ID was not found.';

router.get('/', async (req, res) => {
    const customer = await Customer.find().sort('name');
    res.send(customer);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({ 
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone 
  });
  try {
    customer =  await customer.save();
    res.send(customer);
  }
  catch(e) {
    res.send(e);
  }

});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
      $set: {
        name: req.body.name
      }
    }, { new: true });
    res.send(customer);
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
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send(notFoundMessage);
    res.send(customer);
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
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send(notFoundMessage);
    res.send(customer);
  }
  catch(e) {
    if (e.name == 'CastError')
      return res.status(404).send(notFoundMessage);
    else
      return res.status(400).send(e);
  }

});

module.exports = router;

