const express = require('express');
const app = express();
const mongoose = require('mongoose');
const uri = require('./config/keys').URI;
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');



mongoose.connect(uri)
  .then( () => console.log('Connected to MongoDB...'))
  .catch( err => console.error('Could not connect to MongoDB', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);


// PORT
// set env var in Terminal: export PORT=5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));