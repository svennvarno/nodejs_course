const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    minLength: 5,
    maxLength: 50
  },
  isGold: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String, 
    required: true,
    minLength: 8,
    maxLength: 10
  }
}));

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().min(8).max(10).required()
  });

  return schema.validate(customer);
}

module.exports.validate = validateCustomer;
module.exports.Customer = Customer;
